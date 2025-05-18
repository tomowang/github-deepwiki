export default function ResizePanel({
  children, className, defaultWidth, handlePanelResize}:
  {children: React.ReactNode, className?: string, defaultWidth?: number, handlePanelResize?: (width: number) => void}
){
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(defaultWidth || 400); // Default width
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newWidth = containerRect.right - e.clientX;
    setWidth(newWidth);
    if (handlePanelResize) {
      handlePanelResize(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className={cn("flex", className)}
      style={{ width }}
      ref={containerRef}
    >
      <div
        className="w-[var(--panel-resizer-width)] h-full bg-gray-300 hover:cursor-col-resize"
        onMouseDown={handleMouseDown}
      />
      <div className="w-[calc(100%-var(--panel-resizer-width))] h-full relative">
        {isResizing && <div className="absolute top-0 left-0 w-full h-full z-10"></div>}
        {children}
      </div>
    </div>
  );
}
