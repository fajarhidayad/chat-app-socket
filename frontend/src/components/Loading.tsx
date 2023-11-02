import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  return (
    <main className="bg-darkgrey h-screen flex justify-center items-center">
      <div className="text-white text-4xl flex items-center">
        <CgSpinner className="animate-spin" />
        <p className="ml-3">Loading</p>
      </div>
    </main>
  );
}
