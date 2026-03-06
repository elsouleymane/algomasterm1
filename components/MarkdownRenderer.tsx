'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const codeStyle = vscDarkPlus as any

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { className?: string }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : 'text'
            const isInline = !match

            return !isInline && match ? (
              <SyntaxHighlighter
                style={codeStyle}
                language={language}
                PreTag="div"
                className="rounded-xl my-4 shadow-lg"
                showLineNumbers
                customStyle={{
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className="px-2 py-1 bg-slate-800/80 text-green-400 rounded text-sm font-mono border border-slate-700"
                {...props}
              >
                {children}
              </code>
            )
          },

          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 border-b-2 border-green-500 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-6 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-green-400 mt-4 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-300">
              {children}
            </li>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline decoration-green-500/50 hover:decoration-green-300"
            >
              {children}
            </a>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-500 pl-4 py-2 my-4 bg-green-500/5 rounded-r-lg">
              <div className="text-gray-300 italic">
                {children}
              </div>
            </blockquote>
          ),

          strong: ({ children }) => (
            <strong className="font-bold text-white">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-green-300">
              {children}
            </em>
          ),

          hr: () => (
            <hr className="my-8 border-t border-white/10" />
          ),

          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-green-500/10 border-b-2 border-green-500">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/10">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/5 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-green-400">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
