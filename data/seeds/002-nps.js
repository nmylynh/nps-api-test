exports.seed = function(knex, Promise) {
  const nps = [
    {
      id: 1,
      user_id: 3,
      name: "Daydreamers",
      description: "Daydreamers is an app that adds a screen saver and a song to your phone when you're in daydreaming mode",
      total_promoters: 3,
      total_passives: 2,
      total_detractors: 2,
      nps_score: 14

    },
    {
      id: 2,
      user_id: 3,
      name: "Daydreamers1",
      description: "Daydreamers is an app that adds a screen saver and a song to your phone when you're in daydreaming mode1",
      total_promoters: 3,
      total_passives: 2,
      total_detractors: 2,
      nps_score: 14

    },
    {
      id: 3,
      user_id: 3,
      name: "Daydreamers3",
      description: "Daydreamers is an app that adds a screen saver and a song to your phone when you're in daydreaming mode3",
      total_promoters: 3,
      total_passives: 2,
      total_detractors: 2,
      nps_score: 14
    }
  ];

  return (
    knex
      // Deletes ALL existing entries for nps table
      .raw("TRUNCATE TABLE nps RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("nps").insert(nps);
      })
  );
};
