export const mapWookieeToStandard = (data: any, type: string) => {
  if (type === "people") {
    return {
      name: data.whrascwo,
      height: data.acwoahrracao,
      mass: data.scracc,
      hair_color: data.corahwh_oaooanoorc,
      skin_color: data.worowo_oaooanoorc,
      eye_color: data.rhahrcaoac_roworarc,
      birth_year: data.rhahrcaoac_roworarc,
      gender: "n/a",
      homeworld: "n/a",
      created: data.oarcworaaowowa,
      edited: data.wowaahaowowa,
      url: data.hurcan,
    };
  }
  if (type === "species") {
    return {
      name: data.whrascwo,
      classification: data.oaanraccahwwahoaraaoahoowh,
      designation: data.wawocahrrwhraaoahoowh,
      average_height: data.rahoworcrarrwo_acwoahrracao,
      skin_colors: data.corahwh_oaooanoorcc,
      hair_colors: data.acraahrc_oaooanoorcc,
      eye_colors: data.worowo_oaooanoorcc,
      average_lifespan: data.rahoworcrarrwo_anahwwwocakrawh,
      homeworld: data.acooscwoohoorcanwa,
      language: data.anrawhrrhurarrwo,
      people: data.akwoooakanwo,
      films: data.wwahanscc,
      created: data.oarcworaaowowa,
      edited: data.wowaahaowowa,
      url: data.hurcan,
    };
  }
  if (type === "starships") {
    return {
      name: data.whrascwo,
      model: data.scrawhhuwwraoaaohurcworc,
      manufacturer: data.scoowawoan,
      cost_in_credits: data.oaoocao_ahwh_oarcwowaahaoc,
      length: data.anwowhrraoac,
      max_atmosphering_speed: data.scrak_raaoscoocakacworcahwhrr_cakwowowa,
      crew: data.oarcwooh,
      passengers: "n/a",
      cargo_capacity: data.oararcrroo_oaraakraoaahaoro,
      consumables: data.oaoowhchuscrarhanwoc,
      hyperdrive_rating: data.acroakworcwarcahhowo_rcraaoahwhrr,
      MGLT: data.MGLT,
      starship_class: data.caorarccacahak_oaanracc,
      pilots: data.akahanooaoc || [],
      films: data.wwahanscc,
      created: data.oarcworaaowowa,
      edited: data.wowaahaowowa,
      url: data.hurcan,
    };
  }
  if (type === "films") {
    return {
      title: data.aoahaoanwo,
      episode_id: data.woakahcoowawo_ahwa,
      opening_crawl: data.ooakwowhahwhrr_oarcraohan,
      director: data.waahrcwooaaooorc,
      producer: data.akrcoowahuoaworc,
      release_date: data.rcwoanworacwo_waraaowo,
      characters: data.oaacrarcraoaaoworcc,
      planets: data.akanrawhwoaoc,
      starships: data.caorarccacahakc,
      vehicles: data.howoacahoaanwoc,
      species: data.cakwooaahwoc,
      created: data.oarcworaaowowa,
      edited: data.wowaahaowowa,
      url: data.hurcan,
    };
  }
  if (type === "planets") {
    return {
      name: data.whrascwo,
      rotation_period: data.rcooaoraaoahoowh_akworcahoowa,
      orbital_period: data.oorcrhahaoraan_akworcahoowa,
      diameter: data.waahrascwoaoworc,
      climate: data.oaanahscraaowo,
      gravity: data.rrrcrahoahaoro,
      terrain: data.aoworcrcraahwh,
      surface_water: data.churcwwraoawo_ohraaoworc,
      population: data.akooakhuanraaoahoowh,
      residents: data.rcwocahwawowhaoc,
      films: data.wwahanscc,
      created: data.oarcworaaowowa,
      edited: data.wowaahaowowa,
      url: data.hurcan,
    };
  }
  if (type === "vehicles") {
    return {
      name: data.whrascwo,
      model: data.scoowawoan,
      manufacturer: data.scrawhhuwwraoaaohurcworc,
      cost_in_credits: data.oaoocao_ahwh_oarcwowaahaoc,
      length: data.anwowhrraoac,
      max_atmosphering_speed: data.scrak_raaoscoocakacworcahwhrr_cakwowowa,
      crew: data.oarcwooh,
      passengers: data.akraccwowhrrworcc,
      cargo_capacity: data.oararcrroo_oaraakraoaahaoro,
      consumables: data.oaoowhchuscrarhanwoc,
      vehicle_class: data.howoacahoaanwo_oaanracc,
      pilots: data.akahanooaoc,
      films: data.wwahanscc,
      created: data.oarcworaaowowa,
      edited: data.wowaahaowowa,
      url: data.hurcan,
    };
  }
  return data;
};
