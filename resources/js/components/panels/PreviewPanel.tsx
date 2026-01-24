export function PreviewPanel() {
  return (
    <div className="h-full overflow-hidden">
      {/* Preview container with airmail border styling foundation */}
      <div className="h-full border-2 border-stroke-default bg-bg-weak p-8">
        {/* Invoice preview content will be implemented here */}
        <div className="h-full flex items-center justify-center text-text-weak">
          Invoice Preview
        </div>
      </div>
    </div>
  );
}
