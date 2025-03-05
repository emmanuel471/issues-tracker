import { Button } from "@radix-ui/themes/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5">
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </div>
  );
}
