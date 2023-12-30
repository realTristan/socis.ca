import { type StateObject } from "@/lib/state";

interface SearchInputProps {
  search: StateObject<string>;
}
export default function SearchInput(props: SearchInputProps) {
  const { search } = props;

  return (
    <div className="mt-2 flex w-full flex-row items-center justify-between">
      <input
        className="rounded-lg border border-emerald-500 bg-transparent px-4 py-2 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
        type="text"
        placeholder="Search for a user..."
        onChange={(e) => search.set(e.target.value)}
      />
    </div>
  );
}
