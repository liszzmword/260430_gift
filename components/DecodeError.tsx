import Link from "next/link";

export default function DecodeError() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-extrabold text-purple-900">
          링크가 좀 이상한데?
        </h1>
        <p className="mt-3 text-sm text-purple-900/60">
          링크가 잘렸거나 잘못된 것 같아요.
          <br />
          친구한테 다시 보내달라 해보세요!
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-pink-300/50"
        >
          나도 만들어볼래
        </Link>
      </div>
    </main>
  );
}
