import { useRouter } from 'next/router';

export default function DynamicPage() {
  const router = useRouter();
  const { segment1, segment2 } = router.query;

  return (
    <div>
      <h1>First Segment: {segment1}</h1>
      <h2>Second Segment: {segment2}</h2>

      {/* Insert code to display content of the dynamic URL segments */}

      <p><a href={`/${segment1}/${segment2}/edit`}>Edit this page</a></p>
    </div>
  );
}