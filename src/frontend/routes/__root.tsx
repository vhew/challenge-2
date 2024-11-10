import { Outlet, createRootRoute } from '@tanstack/react-router';

import alloyLogo from '../assets/alloy.png';
import icLogo from '../assets/ic.svg';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <main>
      <div>
        <a href="https://alloy.rs" target="_blank" rel="noreferrer">
          <img src={alloyLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://internetcomputer.org" target="_blank" rel="noreferrer">
          <img src={icLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <p>
        This app is forked from{' '}
        <a
          href="https://github.com/ic-alloy/ic-alloy-toolkit"
          target="_blank"
          rel="noreferrer"
        >
          ic-alloy-toolkit.
        </a>{' '}
        It is an ICP canister with simplified interactions with Ethereum. It uses the{' '}
        <a
          href="https://github.com/ic-alloy/ic-alloy"
          target="_blank"
          rel="noreferrer"
        >
          ic-alloy
        </a>{' '}
        fork that adds ICP as a signer and provider.
      </p>

      <Outlet />
    </main>
  );
}
