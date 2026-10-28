---
title: "Mon profil"
date: 2026-10-01T09:00:00+01:00
draft: false
url: "/profile/"
bodypartial: "profile-page"
bg_image: "images/backgrounds/page-title.jpg"
description : "Profil de l'étudiant. Données démo."
---

<section class="section">
  <div class="container">
    <div class="row">
      <div class="col-12 mb-4">
        <h2 class="demo-page-title">Mon profil</h2>
        <a href="/dashboard/" class="btn btn-outline-primary btn-sm float-right">Retour au tableau de bord</a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card rounded-0 border-primary">
          <div class="card-body text-center">
            <div id="demo-profile-avatar" class="mb-3"></div>
            <h5 class="mb-1" id="demo-profile-name">Nom</h5>
            <p class="text-muted small mb-3" id="demo-profile-program">Programme</p>
            <a href="#" class="btn btn-outline-primary btn-sm" data-demo-logout>Se déconnecter</a>
          </div>
        </div>
      </div>
      <div class="col-md-8 mb-4">
        <div class="card rounded-0 border-primary">
          <div class="card-body p-4">
            <table class="table table-borderless">
              <tr><td class="font-weight-bold" style="width:35%">Nom complet</td><td id="demo-profile-name"></td></tr>
              <tr><td class="font-weight-bold">E-mail</td><td id="demo-profile-email"></td></tr>
              <tr><td class="font-weight-bold">Identifiant étudiant</td><td id="demo-profile-id"></td></tr>
              <tr><td class="font-weight-bold">Programme</td><td id="demo-profile-program"></td></tr>
              <tr><td class="font-weight-bold">Niveau</td><td id="demo-profile-level"></td></tr>
              <tr><td class="font-weight-bold">Année</td><td id="demo-profile-year"></td></tr>
              <tr><td class="font-weight-bold">Campus</td><td id="demo-profile-campus"></td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
