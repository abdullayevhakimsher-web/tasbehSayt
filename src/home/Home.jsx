import React, { useState, useEffect } from 'react'
import './Home.css'

const Home = () => {
  const [son, setSon] = useState(() => {
    const saved = localStorage.getItem('tasbehCount')
    return saved ? Number(saved) : 0
  })

  useEffect(() => {
    localStorage.setItem('tasbehCount', son.toString())
  }, [son])

  const handleIncrement = () => setSon(prev => prev + 1)
  const handleReset = () => setSon(0)

  const marks = Array.from({ length: Math.floor(son / 33) }, (_, index) => (index + 1) * 33)
  const progressCount = son % 33
  const remainingToNext = progressCount === 0 ? 33 : 33 - progressCount

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
        <p>Belgi soni: <strong>{marks.length}</strong></p>
        <p>Keyingi belgi: <strong>{remainingToNext} ta</strong></p>
      </div>

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
          <div className="progress-fill" style={{ width: `${(progressCount / 33) * 100}%` }} />
        </div>
        <p>{progressCount} / 33</p>
      </div>
    </section>
  )
}

export default Home