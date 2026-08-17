"use client";

import { useState } from "react";
import styles from "./AgentCTA.module.css";
import AgentForm from "../AgentForm";

export default function AgentCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="section">
        <div className="row justify-content-center footer-cta">
          <div className="col-lg-7 mx-auto text-center">
            <h2 className="mb-4">
              Be a part of our growing real state agents
            </h2>

            <p>
              <button
                type="button"
                className="btn btn-primary text-white py-3 px-4"
                onClick={handleOpenModal}
              >
                Apply for Real Estate agent
              </button>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.overlay}
          onClick={handleCloseModal}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.close}
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>

            <h2>Apply for Real Estate Agent</h2>

            <p>
              Please fill in your details to apply as a real estate agent.
            </p>

                <AgentForm onSuccess={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
}