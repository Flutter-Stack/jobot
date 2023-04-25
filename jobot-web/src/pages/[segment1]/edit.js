import { useRouter } from 'next/router';

export default function EditPage() {
  const router = useRouter();
  const { segment1, segment2 } = router.query;

  return (
    <div>
      <h1>Edit items in {segment1}/{segment2}/</h1>

      {/* Insert code to edit an item in the dynamic URL segment */}

      <p><a href={`/${segment1}/${segment2}`}>Back to index</a></p>
    </div>
  );
}