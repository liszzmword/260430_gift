import type { Metadata } from "next";
import GameClient from "@/components/GameClient";
import DecodeError from "@/components/DecodeError";
import { decodePayload } from "@/lib/payload";

type Params = { d: string };

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  await props.params;
  return {
    title: "갖고 싶은 선물 있어?? 내가 사줄게!!",
    description: "친구가 너에게 선물을 준비했어! 둘 중 하나를 골라봐 :)",
    openGraph: {
      title: "갖고 싶은 선물 있어?? 내가 사줄게!!",
      description: "친구가 너에게 선물을 준비했어! 둘 중 하나를 골라봐 :)",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "갖고 싶은 선물 있어?? 내가 사줄게!!",
      description: "친구가 너에게 선물을 준비했어! 둘 중 하나를 골라봐 :)",
    },
  };
}

export default async function PlayPage(props: { params: Promise<Params> }) {
  const { d } = await props.params;
  try {
    const { a, b } = decodePayload(d);
    return <GameClient a={a} b={b} />;
  } catch {
    return <DecodeError />;
  }
}
