import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames(className, 'cursor-pointer', {
        'text-black': active && !reversed,
        'text-gray-300': !active && !reversed,
        'text-white': active && reversed,
        'text-gray-400': !active && reversed,
      })}
    />
  )
)

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any
      } & BaseProps
    >,
    ref: Ref<OrNull<null>>
  ) => {
    const textLines = value.document.nodes
      .map(node => node.text)
      .toArray()
      .join('\n')
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(className, 'my-8 mx-5')}
      >
        <div className='text-sm py-2 px-5 text-gray-600 border-t-2 border-gray-200 bg-gray-100'>
          Slate's value as text
        </div>
        <div className='text-gray-600 font-mono whitespace-pre-wrap py-2 px-5'>
          <div className='mb-2'>
            {textLines}
          </div>
        </div>
      </div>
    )
  }
)

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames('material-icons', className, 'text-lg align-text-bottom')}
    />
  )
)

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      ref={ref}
      className={classNames(className, 'whitespace-pre-wrap m-0 mx-5 mb-2 p-5 text-sm bg-yellow-100')}
    />
  )
)

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={classNames(className, 'flex space-x-4')}
    />
  )
)

export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={classNames(className, 'relative py-1 px-4 border-b-2 border-gray-200 mb-5')}
    />
  )
)

