import './styles.css'

export function Tooltip({
  title,
  children,
  ...rest
}) {
  return (
    <div data-testid="tooltip-component" className="app-tooltip-container" {...rest}>
      {children}
      <span data-testid="tooltip-component-span">{title}</span>
    </div>
  )
}
