import React, { useState, useEffect } from 'react'
import './Home.css'

const prayerTimes = [
  { name: 'Bomdod', time: '05:10' },
  { name: 'Peshin', time: '12:30' },
  { name: 'Asr', time: '16:10' },
  { name: 'Shom', time: '19:15' },
  { name: 'Xufton', time: '20:45' },
]

const phrases = [
  'Subhanalloh',
  'Alhamdulillah',
  'Allahu akbar',
  'La ilaha illalloh',
  'Subhanallohi va bihamdihi, subhanallohil aziym',
  'La qavla vala quvvata illa billah',
  "Astag'firulloh",
  "Allohumma solli 'ala Muhammad va 'ala ali Muhammad",
  'Subhanallohi val hamdulillahi vala ilaha illallohu vallohu akbar',
  'Hasbunallohu va ni\'mal vakil',
]

const Home = () => {
  const [son, setSon] = useState(() => {
    const saved = localStorage.getItem('tasbehCount')
    return saved ? Number(saved) : 0
  })
  const [showPrayerTimes, setShowPrayerTimes] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasbehCount', son.toString())
  }, [son])

  const speakPhrase = phrase => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase)
      utterance.lang = 'ar-SA'
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleIncrement = () => {
    const nextCount = son + 1
    const nextPhraseIndex = Math.floor((nextCount - 1) / 33) % phrases.length
    setSon(nextCount)
    speakPhrase(phrases[nextPhraseIndex])
  }

  const handleReset = () => setSon(0)
  const togglePrayerTimes = () => setShowPrayerTimes(prev => !prev)

  const completedSets = Math.floor(son / 33)
  const countInPhrase = son === 0 ? 0 : ((son - 1) % 33) + 1
  const currentPhraseIndex = son === 0 ? 0 : Math.floor((son - 1) / 33) % phrases.length
  const currentPhrase = phrases[currentPhraseIndex]
  const remainingToNext = countInPhrase === 0 ? 33 : 33 - countInPhrase
  const marks = Array.from({ length: completedSets }, (_, index) => (index + 1) * 33)

  return (
    <section className="home-tasbeh">
      <div className="night-decor">
        <span className="shooting-star" />
        <span className="mini-star star-1" />
        <span className="mini-star star-2" />
        <span className="mini-star star-3" />
        <span className="mini-star star-4" />
        <span className="rocket" />
      </div>
      <div className="home-heading">
        <p className="tasbeh-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
        <h1 className="count-display">{son}</h1>
        <p className="subtitle">Tasbehni 33 ta belgi bilan hisoblash</p>
      </div>

      <div className="status-info">
        <p>Belgi soni: <strong>{completedSets}</strong></p>
        <p>Keyingi belgi: <strong>{remainingToNext} ta</strong></p>
      </div>

      <div className="info-block">
        <div className="phrase-card">
          <p className="phrase-label">Hozirgi zikr</p>
          <h2 className="phrase-text">{currentPhrase}</h2>
          <p className="phrase-subtitle">{countInPhrase} / 33 — {currentPhraseIndex + 1}-chi zikr</p>
        </div>

        <button className="btn btn-secondary prayer-toggle" onClick={togglePrayerTimes}>
          {showPrayerTimes ? 'Namoz vaqtlari yashirish' : 'Azon vaqtlari ko‘rsatish'}
        </button>
      </div>

      {showPrayerTimes && (
        <div className="prayer-panel">
          <h3>5 vaqt namoz vaqtlari</h3>
          <div className="prayer-list">
            {prayerTimes.map(item => (
              <div key={item.name} className="prayer-item">
                <span>{item.name}</span>
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="marks">
        {marks.length === 0 ? (
          <span className="mark-empty">Hozircha belgilar yo'q</span>
        ) : (
          marks.map(value => (
            <span key={value} className="mark">{value}</span>
          ))
        )}
      </div>

      <div className="button-row">
        <button className="btn btn-primary" onClick={handleIncrement}>+</button>
        <button className="btn btn-secondary" onClick={handleReset}>O'chirish</button>
      </div>

      <div className="progress-bar">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(countInPhrase / 33) * 100}%` }} />
        </div>
        <p>{countInPhrase} / 33</p>
      </div>

      <div className="phrase-list-card">
        <h3>10 ta zikr</h3>
        <div className="phrase-list-items">
          {phrases.map((phrase, index) => (
            <div key={phrase} className={`phrase-item-card ${index === currentPhraseIndex ? 'active' : ''}`}>
              <span>{index + 1}.</span>
              <p>{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
