import React from 'react';

function ForgotLogin() {
  return (
    <div className="modal fade" id="forgotLoginModal" tabIndex={-1} aria-labelledby="forgotLoginModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="forgotLoginModalLabel">Восстановление логина</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Введите ваш Email</label>
                <input type="email" className="form-control" id="emailInput" placeholder="example@example.com" required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Восстановить логин</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotLogin;
