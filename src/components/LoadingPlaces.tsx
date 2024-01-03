export const LoadingPlaces = () => {
  return (
    <div className="py-3 d-flex justify-content-center align-items-center">
      <div>
      <h6>Buscando</h6>
        <p>Espere por favor...</p>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}
