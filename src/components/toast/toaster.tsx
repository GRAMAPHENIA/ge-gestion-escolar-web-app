// app/page.jsx
"use client";

import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Success",
      description: "This is a success message!",
    });
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
    </div>
  );
}