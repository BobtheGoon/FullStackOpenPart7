const InfoMessage = ({ message, style }) => {
  if (message === null) return null

  return (
    <div>
      <p className={style}>{message}</p>
    </div>
  )
}

export default InfoMessage