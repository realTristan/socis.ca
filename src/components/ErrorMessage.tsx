/**
 * Error message component
 * @returns JSX.Element
 */
export default function ErrorMessage({
  children,
}: {
  children: string;
}): JSX.Element {
  return (
    <p className="text-center text-sm text-red-600 lg:text-base">{children}</p>
  );
}
