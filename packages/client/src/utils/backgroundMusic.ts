import audio from '@/assets/music/background.mp3'

let backgroundMusic: HTMLAudioElement| undefined

// ssr hack
function useBackgroundMusic() {
  if (!backgroundMusic) {
    backgroundMusic = new Audio(audio)
    backgroundMusic.loop = true
  }
  return backgroundMusic
}

export default useBackgroundMusic
