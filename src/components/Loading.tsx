export const Loading = () => {
  return (
        <div className="d-flex justify-content-center align-items-center
            vh-100 vw-100 position-fixed top-0 start-0"
            style={{color: 'white', backgroundColor: '#FFF'}}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading...</p>
            </div>
        </div>
  )
}
