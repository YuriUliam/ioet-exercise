import { render } from '@testing-library/react'
import { Button } from '../../components/Button'
import '@testing-library/jest-dom/extend-expect'

describe('Button Component', () => {
  it('should be able to render a given title', () => {
    const myTitle = 'My Button'
    const { container, unmount } = render(<Button>{myTitle}</Button>)

    expect(container).toHaveTextContent(myTitle)
    unmount()
  })

  it('should render "Loading..." when the loading property is set', () => {
    const myTitle = 'My Button'
    const { container, unmount } = render(<Button loading>{myTitle}</Button>)

    expect(container).toHaveTextContent('Loading...')
    unmount()
  })
})