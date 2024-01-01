import { Heading, Features } from '@/app/components'
import Container from './components/Container'

export default function Home() {
  return (
    <Container classes='min-h-screen'>
      <Heading />
      <Features />
    </Container>
  )
}
