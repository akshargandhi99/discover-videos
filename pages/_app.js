import { Roboto_Slab } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "@/lib/magic-client";

import Loading from "@/components/loading/loading";
import "@/styles/globals.css";

const robotoSlab = Roboto_Slab({
  weight: ["700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <main className={robotoSlab.className}>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </main>
  );
}
