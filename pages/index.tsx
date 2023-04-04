import { WeatherDisplay } from '@/components/WeatherDisplay'
import { LocationContextWrapper } from '@/contextes/LocationContext'
import Head from 'next/head'
import styles from "@/styles/indexPage.module.scss";
import { Menu } from '@/components/Menu';

export default function Home() {
  return (
    <>
      <Head>
        <title>Themed WWWeather</title>
        <meta name="description" content="Weather with your theme. Fast and usefull." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.bgColored} ${styles.main}`}>
        <LocationContextWrapper>
          <Menu/>
          <WeatherDisplay />
          <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </LocationContextWrapper>
      </main>
    </>
  )
}
