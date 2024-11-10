import { Link, createLazyFileRoute } from '@tanstack/react-router'

import { backend } from '../../backend/declarations'
import { useMutation, useQuery } from '@tanstack/react-query'
import Source from '../components/source'

export const Route = createLazyFileRoute('/watch_usdc_transfer')({
  component: Page,
})

function Page() {
  const {
    data: isPollingResult,
  } = useQuery({
    queryKey: ['watch_usdc_transfer_is_polling'],
    queryFn: () => backend.watch_usdc_transfer_is_polling(),
    refetchInterval: 5000,
  })

  const {
    data: pollCountResult,
  } = useQuery({
    queryKey: ['watch_usdc_transfer_poll_count'],
    queryFn: () => backend.watch_usdc_transfer_poll_count(),
    refetchInterval: 5000,
  })

  const {
    data: getResult,
  } = useQuery({
    queryKey: ['watch_usdc_transfer_get'],
    queryFn: () => backend.watch_usdc_transfer_get(),
    refetchInterval: 5000,
  })

  const {
    data: startResult,
    isPending: isFetchingStart,
    mutate: start,
  } = useMutation({
    mutationFn: () => backend.watch_usdc_transfer_start(),
  })

  const {
    data: stopResult,
    isPending: isFetchingStop,
    mutate: stop,
  } = useMutation({
    mutationFn: () => backend.watch_usdc_transfer_stop(),
  })

  const isPolling = isPollingResult && 'Ok' in isPollingResult && isPollingResult.Ok === true;
  const pollCount = pollCountResult && 'Ok' in pollCountResult ? pollCountResult.Ok : 0;

  var filteredResult = [];
  if (typeof getResult == "object" && 'Ok' in getResult) {
    for (var i=0; i < getResult.Ok.length; i++) {
      // cleanup String and convert to JSON object
      var resultStr = getResult.Ok[i];
      resultStr = resultStr.replace(/\\"/g, '"');
      resultStr = resultStr.slice(1,-1);
      resultStr = resultStr.replace('Some','');
      resultStr = resultStr.replace(/[()]/g, '');
      var result = JSON.parse(resultStr)

      // if value > $100,000 (1000000000000) then display
      if (result.value > 100000000000) {
        // replace tx_hash with link to base explorer
        result.tx_hash = "https://basescan.org/tx/" + result.tx_hash;
        result.dollar_value = '$'+(Math.round(result.value * 100) / 100000000).toFixed(2);
        filteredResult.push(result)
        // console.log(result);
      }
    }
  }
 
  return (
    <>
      <Link to="/">
        <button> Menu</button>
      </Link>
      <div className="card">
        <p>Watch Base for latest USDC transfers greater than $100,000. Pushing the start button will tell the canister to create a poller that gets executed every 10 seconds.</p>

        <p>
          {isPolling ?
            `🟢 Watching for transfers, ${pollCount}/10`
            :
            "🔴 Not watching for transfers"
          }
        </p>

        <button disabled={isFetchingStart} onClick={() => void start()}>
          {isFetchingStart ? 'Requesting…' : 'watch_usdc_transfer_start()'}
        </button>
        {startResult && (
          <pre>{JSON.stringify(startResult, null, 2)}</pre>
        )}

        <button disabled={isFetchingStop} onClick={() => void stop()}>
          {isFetchingStop ? 'Requesting…' : 'watch_usdc_transfer_stop()'}
        </button>
        {stopResult && (
          <pre>{JSON.stringify(stopResult, null, 2)}</pre>
        )}        
        <p>Fetched transfer logs, gets reset every time the start button is pushed.</p>

        {filteredResult && (
          <pre>{JSON.stringify(filteredResult, null, 2)}</pre>
        )}

        <Source file="watch_usdc_transfer.rs" />
      </div >
    </>
  )
}
