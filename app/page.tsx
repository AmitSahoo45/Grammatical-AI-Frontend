import { Heading, Features } from '@/app/components'
import Container from './components/Container'

export default function Home() {
  return (
    <Container classes='min-h-screen'>
      <Heading />
      <Features />

      <div className='mb-3 text-center'>
        <a
          href="https://forms.gle/ef8aHQrm96omDxBWA"
          target="_blank"
          rel="noreferrer"
          className="text-theme-pink hover:underline text-sm font-bold"
        >
          Faced some issue? Report it here.
        </a>
      </div>
    </Container>
  )
}
