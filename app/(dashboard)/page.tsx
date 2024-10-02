"use client";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <button onClick={onOpen}>
        Click me
      </button>
    </div>
  );
};
