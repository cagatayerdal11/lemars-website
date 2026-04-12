interface TAPDKBannerDict {
  banner: string;
}

export default function TAPDKBanner({ dict }: { dict: TAPDKBannerDict }) {
  return (
    <div className="bg-gray-900 text-gray-400 text-center py-2 px-4">
      <p className="text-[10px] tracking-wider">
        {dict.banner}
      </p>
    </div>
  );
}
