import './styles.css'

export function Button({ children, loading, ...rest }) {
  return (
    <button data-testid="button-component" className="app-button-container" type="button" {...rest}>
      {loading ? 'Loading...' : children}
    </button>
  )
}
