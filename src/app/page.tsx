"use client";

import dynamic from "next/dynamic";
import ComingSoon from "@/components/coming-soon";

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="paper" />
      <div className="vignette" />
      <CustomCursor />
      <ComingSoon />
    </>
  );
}
