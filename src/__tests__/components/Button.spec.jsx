import { render } from '@testing-library/react'
import { Button } from '../../components/Button'
import '@testing-library/jest-dom/extend-expect'

describe('Button Component', () => {
  it('should be able to render a given title', () => {
    const myTitle = 'My Button'
    const { container } = render(<Button>{myTitle}</Button>)

    expect(container).toHaveTextContent(myTitle)
  })

  it('should render "Loading..." when the loading property is set', () => {
    const myTitle = 'My Button'
    const { container } = render(<Button loading>{myTitle}</Button>)

    expect(container).toHaveTextContent('Loading...')
  })
})