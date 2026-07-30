import type { GetServerSideProps } from 'next'
import { renderRobots } from '@/lib/seo/robots'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.write(renderRobots())
  res.end()
  return { props: {} }
}

export default function Robots() { return null }
