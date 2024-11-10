import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="menu">
      <Link to="/watch_usdc_transfer">
        <button>watch_usdc_transfer() &gt; $1,000,000</button>
      </Link>
    </div>
  );
}
