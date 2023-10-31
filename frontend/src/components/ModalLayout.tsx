import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewChannel } from '../api/channel';

export default function ModalLayout(props: { setModalOff: () => void }) {
  const channelNameRef = useRef<HTMLInputElement>(null);
  const channelDescRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const channelMutation = useMutation({
    mutationFn: (channel: { name: string; description: string }) =>
      createNewChannel(channel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      props.setModalOff();
    },
  });

  const handleSuhmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (channelNameRef.current && channelDescRef.current) {
      channelMutation.mutate({
        name: channelNameRef.current.value,
        description: channelDescRef.current.value,
      });
    }
  };

  return (
    <section className="bg-darkgrey/70 h-screen flex items-center justify-center fixed z-50 w-full">
      <form
        onSubmit={handleSuhmitForm}
        className="bg-darkgrey rounded-xl px-10 py-7 text-white flex flex-col gap-5 w-[400px]"
      >
        <h2 className="text-xl">Create New Channel</h2>
        <input
          ref={channelNameRef}
          type="text"
          name="name"
          placeholder="Channel name"
          className="bg-lightgrey p-3 rounded-lg"
        />
        <textarea
          ref={channelDescRef}
          name="name"
          placeholder="Channel description"
          className="bg-lightgrey p-3 rounded-lg"
        />
        <div className="self-end">
          <button
            onClick={props.setModalOff}
            className="rounded-lg bg-gray-700 py-2 px-5 mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-500 py-2 px-5"
            disabled={channelMutation.isLoading}
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
