import { render } from '@testing-library/react'

import { Tooltip } from '../../components/Tooltip'
import '@testing-library/jest-dom/extend-expect'

describe('Tooltip Component', () => {
  it('should be able to render a given children', () => {
    const children = 'X'
    const { container } = render(<Tooltip>{children}</Tooltip>)

    expect(container).toHaveTextContent(children)
  })

  it('should be able to render a title on the span', () => {
    const children = 'X'
    const title = 'My tooltip!'
    
    const { getByTestId } = render(<Tooltip title={title}>{children}</Tooltip>)

    const spanElement = getByTestId('tooltip-component-span')

    expect(spanElement).toHaveTextContent(title)
  })
})