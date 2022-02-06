import './styles.css'

export function Tooltip({
  title,
  children
}) {
  return (
    <div data-testid="tooltip-component" className="app-tooltip-container">
      {children}
      <span data-testid="tooltip-component-span">{title}</span>
    </div>
  )
}
