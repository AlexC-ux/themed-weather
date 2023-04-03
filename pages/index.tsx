import { CitySearch } from '@/components/CitySearch'
import { WeatherDisplay } from '@/components/WeatherDisplay'
import { LocationContextWrapper } from '@/contextes/LocationContext'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Themed WWWeather</title>
        <meta name="description" content="Weather with your theme. Fast and usefull." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LocationContextWrapper>
          <div
            style={{
              width: "200px"
            }}>
            <CitySearch />
          </div>
          <WeatherDisplay />
          <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </LocationContextWrapper>
      </main>
    </>
  )
}
