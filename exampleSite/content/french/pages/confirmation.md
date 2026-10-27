---
title: "Confirmation de candidature"
date: 2026-10-01T09:00:00+01:00
draft: false
url: "/apply/confirmation/"
bodypartial: "confirmation-page"
bg_image: "images/backgrounds/page-title.jpg"
description : "Votre candidature a été enregistrée. Numéro de dossier et récapitulatif. Démo uniquement."
---

<section class="section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-success rounded-0 hover-shadow mb-5">
          <div class="card-body p-4 p-md-5 text-center">
            <h2 class="card-title mb-3">Candidature enregistrée <i class="ti-check text-success ml-2"></i></h2>
            <p class="text-muted mb-4">Votre dossier de candidature a été transmis (démo). Conservez votre numéro de dossier.</p>

            <div class="alert alert-info mb-4">
              <strong>Démo uniquement, aucun paiement réel.</strong> Cette simulation est destinée à un projet scolaire.
            </div>

            <div class="demo-receipt" id="demo-conf-receipt" style="display:none; background:#f8f9fe; border:1px solid #e9ecef; border-radius:6px; padding:1.5rem; margin-bottom:1.5rem;">
              <h5 class="text-primary mb-3">Récapitulatif du paiement</h5>
              <p class="mb-1"><strong>N° dossier :</strong> <span id="demo-conf-receipt-no"></span></p>
              <p class="mb-1"><strong>Montant :</strong> <span id="demo-conf-receipt-amount"></span></p>
              <p class="mb-1"><strong>Date :</strong> <span id="demo-conf-receipt-date"></span></p>
              <p class="mb-1"><strong>Mode :</strong> <span id="demo-conf-receipt-method"></span></p>
            </div>

            <div class="text-center mb-5">
              <h4 class="text-primary font-weight-bold" id="demo-conf-appno">APP------</h4>
              <p class="text-muted small">Numéro de candidature</p>
            </div>

            <div class="mb-1"><strong>Nom :</strong> <span id="demo-conf-name"></span></div>
            <div class="mb-1"><strong>Filière :</strong> <span id="demo-conf-program"></span></div>
            <div class="mb-1"><strong>Date de dépôt :</strong> <span id="demo-conf-date"></span></div>

            <hr class="my-4">
            <div class="text-center">
              <a href="/dashboard/" class="btn btn-primary btn-lg px-5">Accéder à mon espace étudiant</a>
              <a href="/" class="btn btn-outline-secondary btn-lg px-5 ml-3">Retour à l'accueil</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
