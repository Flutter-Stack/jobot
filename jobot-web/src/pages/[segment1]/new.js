import { useRouter } from 'next/router';

export default function NewPage() {
  const router = useRouter();
  const { segment1, segment2 } = router.query;

  return (
    <div>
      <h1>Add a new item to {segment1}/{segment2}/</h1>

      {/* Insert code to add a new item to the dynamic URL segment */}

      <p><a href={`/${segment1}/${segment2}`}>Back to index</a></p>
    </div>
  );
}

