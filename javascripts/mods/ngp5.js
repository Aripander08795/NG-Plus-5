function resetNGP5V() {
	player.ghostify.darkness = {
		amount: new Decimal(0),
		generators: new Decimal(0),
		upgrades: [],
	}
	buildDarknessTable()
	player.ghostify.challenges = {
		completed: [],
		active: 0,
		records: [1/0,1/0,1/0,1/0],
		tiers: [0,0,0,0],
	}
	player.ghostify.endlessMirrors = {
		amount: 0,
		lightEnergy: new Decimal(0),
		refraction: {
			energy: new Decimal(0),
			light: new Decimal(0),
			rebuyable: 0,
		},
	}
	player.ghostify.dimensions = {
		amount: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
		bought: [null,0,0,0,0,0,0,0,0],
		power: new Decimal(0),
		spirits: 0,
	}
	player.dilation.br = {
		"break": hasAnnihilationUpg(24) ? player.dilation.br : false,
		upgrades: [],
		rebuyable: 0,
		cherenkovRadiation: new Decimal(0),
	}
	player.ghostify.baryons = {
		nucleons: {
			protons: 0,
			neutrons: 0,
			sacrificed: 0,
		},
		hyperons: {
			unl: false,
			target: 0,
			lambda: 0,
			sigma: 0,
			xi: 0,
			omega: 0,
			supercharge: {
				hyperons: 0,
				active: false,
			},
		},
	}
	player.ghostify.annihilation = {
		active: false,
		tier: 1,
		exoticMatter: new Decimal(0),
		upgrades: [],
		rebuyable: 0,
		maxTier: 1,
		storage: {
			lE: 0,
			brBreak: false,
			timestudies: [],
			dilstudies: [],
			masterystudies: [],
			neutrinoUpgs: [],
			darkness: new Decimal(0),
			eMr: 0,
			dilUpgs: [],
			nb: 0,
			bru: [],
			gUpgs: [],
			eM: 0,
			brEb: false,
			brEu: [],
		},
		innerStorage: {
			qcs: {},
			pcs: {
				order: {},
				completed: 0,
			},
			mT: 1,
		},
		antibaryons: {
			positrons: 0,
			antiprotons: 0,
			antineutrons: 0,
			antihyperons: 0,
			total: 0,
		},
		cascade: {
			times: 0,
			amount: 0,
			power: new Decimal(0),
		},
	}
	player.replicantiBoosts = {
		amount: 0,
		auto: false,
	}
	player.aarexModifications.autoElectrons = false
}

function updateNGP5V(active,diff) {
	if (player.masterystudies === undefined) active = false
	else {
		if (player.masterystudies.includes("d14")) {
                if (player.ghostify.milestones>7) {
                    document.getElementById("spaceShards").textContent=shortenDimensions(tmp.qu.bigRip.spaceShards)
                    for (var u=1;u<((hasNU(20))?26:(player.ghostify.ghostlyPhotons.enpowerments>=10)?22:player.ghostify.ghostlyPhotons.unl?21:18);u++) {
                        document.getElementById("bigripupg"+u).className = tmp.qu.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
                        document.getElementById("bigripupg"+u+"cost").textContent = shortenDimensions(new Decimal(bigRipUpgCosts[u]))
                    }
                }
				document.getElementById("bru24cr").textContent = (active ? player.dilation.br['break'] : false) ? "Cherenkov Radiation" : "Something you haven't discovered yet"
                document.getElementById("bigripupg1current").textContent=shortenDimensions(tmp.bru[0])
                document.getElementById("bigripupg8current").textContent=shortenDimensions(tmp.bru[1])+(Decimal.gte(tmp.bru[1],Number.MAX_VALUE)&&!hasNU(11)?"x (cap)":"x")
                document.getElementById("bigripupg14current").textContent=tmp.bru[2].toFixed(2)
                var bru15effect = Math.sqrt(player.eternityPoints.add(1).log10()) * 3.55
                document.getElementById("bigripupg15current").textContent=bru15effect < 999.995 ? bru15effect.toFixed(2) : getFullExpansion(Math.round(bru15effect))
                document.getElementById("bigripupg16current").textContent=shorten(player.dilation.dilatedTime.div(1e100).pow(0.155).max(1))
                if (player.ghostify.ghostlyPhotons.unl) {
                    document.getElementById("bigripupg18current").textContent=shorten(tmp.bru[3])
                    document.getElementById("bigripupg19current").textContent=shorten(tmp.bru[4])
                    document.getElementById("bigripupg20current").textContent=shorten(tmp.bru[5])
                }
			}
	}
	if (currentAnnihilationTier()>0) updateColorCharge()
	if (player.replicanti.unl && player.replicanti.amount.eq(0)) player.replicanti.amount = new Decimal(1)
	document.getElementById("dimboostdatabtn").style.display = (player.resets >= getSupersonicStart() || player.resets >= getHypersonicStart() || quantumed || ghostified) ? "" : "none"
	document.getElementById("galaxydatabtn").style.display = (player.galaxies >= 100 || quantumed || ghostified) ? "" : "none"
	updateScaleData()
	if (active) updateBreakEternity()
	document.getElementById("lEbG").textContent = currentAnnihilationTier()>0?"go quantum and ":"become a ghost and "
	if (tmp.ngp3) if (hasNU(22) || player.ghostify.ghostlyPhotons.enpowerments >= 3 || currentAnnihilationTier()>0) updateElectrons()
	document.getElementById('breakUpgR4').style.display = (active ? player.ghostify.endlessMirrors.amount > 0 : false) ? "" : "none"
	document.getElementById('enabledilation').style.display = (active ? player.dilation.br['break'] : false) ? "none" : ""
	document.getElementById('bru22min').textContent = shorten(Decimal.min(Decimal.pow('1e33',player.galaxies/1000),'1e1200'))
	document.getElementById('electronsMax').style.display = (hasNU(22)) ? "" : "none"
	document.getElementById('darknesstabbtn').style.display = (active ? player.ghostify.ghostlyPhotons.enpowerments>=1 : false) ? "" : "none"
	document.getElementById('gctabbtn').style.display = (active ? (player.ghostify.darkness.upgrades[2][2] === true) : false) ? "" : "none"
	document.getElementById('vLbC').style.display = (active ? player.ghostify.ghostlyPhotons.enpowerments>=10 : false) ? "" : "none"
	document.getElementById('bigripupg21').parentElement.style.display = (active ? player.ghostify.ghostlyPhotons.enpowerments>=10 : false) ? "" : 'none'
	for (u=22;u<26;u++) document.getElementById('bigripupg'+u).style.display = (active ? hasNU(20) : false) ? "" : 'none'
	document.getElementById('emtabbtn').style.display = (active ? player.ghostify.challenges.tiers[3]>0 : false) ? "" : "none"
	document.getElementById('gdtabbtn').style.display = (active ? player.ghostify.endlessMirrors.amount>=5 || currentAnnihilationTier()>0 : false) ? "" : "none"
	document.getElementById('gdRow').style.display = (active ? player.ghostify.endlessMirrors.amount >= 25 : false) ? "" : "none"
	document.getElementById('gdRow2').style.display = (active ? player.ghostify.endlessMirrors.amount >= 25 : false) ? "" : "none"
	document.getElementById('bDilRow').style.display = (active ? player.ghostify.dimensions.bought[8]>0||player.ghostify.dimensions.spirits>0 : false) ? "" : "none"
	document.getElementById('breakDilationTabbtn').style.display = (currentAnnihilationTier()>0 ? hasAnnihilationUpg(24) : (active ? player.ghostify.dimensions.bought[4]>0 : false)) ? "" : "none"
	document.getElementById('baryonstabbtn').style.display = (active ? player.dilation.br.upgrades.includes(15) : false) ? "" : "none"
	document.getElementById('annihilationtabbtn').style.display = (active ? player.ghostify.baryons.hyperons.unl : false) ? "" : "none"
	if (!active) document.getElementById("gcsbtn").style.display = "none"
	if (active) { 
		player.ghostify.darkness.amount = player.ghostify.darkness.amount.plus(getDarknessGen().times(diff/10))
		document.getElementById('vLb').textContent = shorten(getUVLB())
		if (document.getElementById('darknesstab').style.display != "none" && document.getElementById('ghostify').style.display != "none") {
			document.getElementById('darknessLocked').style.display = (player.ghostify.ghostlyPhotons.enpowerments>=3) ? "none" : ""
			document.getElementById('darknessLocked').innerHTML = "Reach 3 Light Empowerments to unlock Darkness"
			document.getElementById('darknessStuff').style.display = (player.ghostify.ghostlyPhotons.enpowerments>=3) ? "" : "none"
			document.getElementById('darknessAmount').textContent = shortenMoney(player.ghostify.darkness.amount)
			document.getElementById('darknessGens').textContent = shortenDimensions(player.ghostify.darkness.generators)
			document.getElementById('buyDarknessGen').textContent = "Sacrifice all GHP for " +shortenDimensions(getDarknessSacReward()) +" Darkness Generators."
			document.getElementById('freeElectrons').textContent = getFullExpansion(getFreeElectrons())
			updateDarknessUpgs()
		}
		document.getElementById("gcsbtn").style.display = "none"
		var temp=0
		var tempcounter=0
		for (var i=1;i<=4;i++) {
			document.getElementById('gctime'+i).style.display = 'none'
			setAndMaybeShow("gctime"+i,player.ghostify.challenges.records[i-1],'"Ghostly Challenge '+i+' time record: "+timeDisplayShort(player.ghostify.challenges.records['+(i-1)+'], false, 3)')
			if (player.ghostify.challenges.records[i-1] != 1/0) {
				temp+=player.ghostify.challenges.records[i-1]
				tempcounter++
				document.getElementById('gctime'+i).style.display = ''
			}
		}
		if (tempcounter>0) document.getElementById("gcsbtn").style.display = "inline-block"
		setAndMaybeShow("gctimesum",tempcounter>1,'"Sum of completed ghostly challenge time records is "+timeDisplayShort('+temp+', false, 3)')
		for (var i=1;i<=4;i++) {
			setAndMaybeShow("gctier"+i,player.ghostify.challenges.records[i-1],'"Ghostly Challenge '+i+' tier: "+getFullExpansion(player.ghostify.challenges.tiers['+(i-1)+'], false, 3)')
			if (i>1) document.getElementById('gc'+i+'div').style.display = (player.ghostify.challenges.tiers[i-2]>0) ? "inline-block" : "none"
			updateGC(i)
		}
		document.getElementById('gcqw').textContent = shortenMoney(quantumWorth)
		if (player.ghostify.challenges.tiers[3] > 1) {
			player.ghostify.endlessMirrors.lightEnergy = player.ghostify.endlessMirrors.lightEnergy.plus(Decimal.mul(getLightEnergyGen(),diff/10))
			player.ghostify.endlessMirrors.refraction.energy = player.ghostify.endlessMirrors.refraction.energy.plus(Decimal.mul(getEndlessMirrorData().prod,diff/10))
			player.ghostify.endlessMirrors.refraction.light = player.ghostify.endlessMirrors.refraction.light.plus(getRefractedLightGain().times(diff/10))
		}
		if (document.getElementById('endlessMirrorsTab').style.display != "none" && document.getElementById('ghostify').style.display != "none") {
			document.getElementById('emLocked').style.display = (player.ghostify.challenges.tiers[3] > 1) ? "none" : ""
			document.getElementById('emStuff').style.display = (player.ghostify.challenges.tiers[3] > 1) ? "" : "none"
			document.getElementById('tLem').textContent = getFullExpansion(getTotalLights())
			document.getElementById('lightEnergy').textContent = shortenMoney(player.ghostify.endlessMirrors.lightEnergy)
			document.getElementById('buyEndlessMirror').innerHTML = "Buy 1 Endless Mirror<br>Cost: " +shortenCosts(getEndlessMirrorData().cost) +" Refracted Light."
			document.getElementById('endlessMirrors').textContent = getFullExpansion(player.ghostify.endlessMirrors.amount)
			document.getElementById('refEnergy').textContent = shortenMoney(player.ghostify.endlessMirrors.refraction.energy)
			document.getElementById('refFactor').textContent = shorten(getRefractionFactor())
			document.getElementById('refLight').textContent = shortenMoney(player.ghostify.endlessMirrors.refraction.light)
			document.getElementById('MDBRR').textContent = shorten(getMDBRR())
			document.getElementById('lEm').textContent = shorten(getLightEnergyMult())
			document.getElementById('buyRefractionRebuyable').innerHTML = "Multiply Light Energy gain by 2.<br>Cost: " +shorten(getRefractionRebuyableCost()) +" Refraction Energy.<br>Currently: " +shorten(getRefractionRebuyableMult()) +"x."
			document.getElementById('buyRefractionRebuyable').className = (player.ghostify.endlessMirrors.refraction.energy.gte(getRefractionRebuyableCost()) ? "storebtn" : "unavailablebtn")+" gluonupgrade"
		} 
		if (document.getElementById('ghostdimensions').style.display != "none" && document.getElementById('dimensions').style.display != "none") {
			document.getElementById('gdlocked').style.display = (player.ghostify.endlessMirrors.amount>=25||currentAnnihilationTier()>0) ? "none" : ''
			document.getElementById('gdstuff').style.display = (player.ghostify.endlessMirrors.amount>=25||currentAnnihilationTier()>0) ? "" : 'none'
			document.getElementById('ghostPower').textContent = shortenMoney(player.ghostify.dimensions.power)
			document.getElementById('ghostPowerEff').textContent = getFullExpansion(getGhostPowerEff())
			document.getElementById('ghostPowerEff2').textContent = getFullExpansion(getBRDBLim())
			document.getElementById('ghostPowerEff3').textContent = shorten(getMetaBoostPower(1).power)
			for (i=1;i<=8;i++) {
				if (i>1) document.getElementById('GhostRow'+i).style.display = (player.ghostify.dimensions.amount[i-1].gt(0)) ? "" : "none"
				document.getElementById('GhostD'+i).textContent = DISPLAY_NAMES[i] +' Ghost Dimension x' +shorten(ghostDimData(i).mult())
				document.getElementById('Ghost'+i+'Amount').textContent = shortenDimensions(player.ghostify.dimensions.amount[i])
				document.getElementById('Ghost'+i).className = (player.ghostify.ghostParticles.lt(ghostDimData(i).cost().cost)) ? "unavailablebtn" : "storebtn"
				document.getElementById('Ghost'+i).textContent = "Cost: " +shortenCosts(ghostDimData(i).cost().cost) +" GHP"
			}
			document.getElementById('spiritRow').style.display = (player.ghostify.dimensions.spirits>0||player.ghostify.dimensions.bought[8]>0) ? "" : "none"
			document.getElementById('spiritA').textContent = "Spirits (" +getFullExpansion(player.ghostify.dimensions.spirits) +")"
			document.getElementById('spiritEff').textContent = "Multiplier per Ghost Dimension: " +shorten(ghostDimData(8).mpt()) +"x."
			document.getElementById('spirits').textContent = "Requirement: " +getFullExpansion(getSpiritRequirement()) +" Eighth Ghost Dimensions"
			document.getElementById('spirits').className = (player.ghostify.dimensions.bought[8]>=getSpiritRequirement()) ? "storebtn" : "unavailablebtn"
		}
		player.ghostify.dimensions.power = player.ghostify.dimensions.power.plus(ghostDimData(1).mult().times(player.ghostify.dimensions.amount[1]).times(diff/10))
		for (i=1;i<=7;i++) {
			player.ghostify.dimensions.amount[i] = player.ghostify.dimensions.amount[i].plus(ghostDimData(i+1).mult().times(player.ghostify.dimensions.amount[i+1]).times(diff/10))
		}
		if (document.getElementById('breakDilation').style.display != 'none' && document.getElementById('eternitystore').style.display != 'none') {
			document.getElementById('breakDilationLocked').style.display = (player.ghostify.dimensions.bought[8]>0) ? "none" : ""
			document.getElementById('breakDilationStuff').style.display = (player.ghostify.dimensions.bought[8]>0) ? "" : "none"
			document.getElementById('breakDilationBtn').textContent = (player.dilation.br['break']) ? "FIX DILATION" : "BREAK DILATION"
			document.getElementById('breakDilationBtn').setAttribute('ach-tooltip',"Breaking Dilation allows you to gain Tachyon Particles without Dilating Time, however, you also begin to generate Cherenkov Radiation based on your TP, which divides your DT gain. The only way to reset your Cherenkov Radiation is to Fix Dilation, which performs a "+(currentAnnihilationTier()==0?"Ghostify":"Quantum")+" reset and resets your TP amount.")
			document.getElementById('cherenkovRadiation').textContent = shortenMoney(player.dilation.br.cherenkovRadiation)
			document.getElementById('cRe').textContent = shorten(getCherenkovRadiationEff())
			document.getElementById('cRp').textContent = shorten(getCherenkovRadiationEff(true).exp)
			document.getElementById('cRd').textContent = shorten(getCherenkovRadiationEff(true).div)
			for (i=1;i<=18;i++) {
				document.getElementById('breakDilation'+i).className = (hasBDUpg(i) ? "dilationupgbought" : ((player.dilation.br.cherenkovRadiation.gte(getBDUpgCost(i))&&player.dilation.br['break']) ? "dilationupg" : "dilationupglocked"))+" rad"
				document.getElementById('breakDilation'+i+'Cost').textContent = shortenCosts(getBDUpgCost(i))
				document.getElementById('breakDilation'+i+'Current').textContent = getBDUpgDesc(i)
			}
			document.getElementById("breakDilationBryRow").style.display = (player.dilation.br.upgrades.includes(15)) ? "" : "none"
			document.getElementById('breakDilation0').className = ((player.dilation.br.cherenkovRadiation.gte(getBDUpgCost(0))&&player.dilation.br['break']) ? "dilationupgrebuyable" : "dilationupgrebuyablelocked")+" rad"
			document.getElementById('breakDilation0Cost').textContent = shortenCosts(getBDUpgCost(0))
			document.getElementById('breakDilation0Current').textContent = getBDUpgDesc(0)
		}
		if (player.dilation.br['break']) {
			player.dilation.tachyonParticles = player.dilation.tachyonParticles.max(getDilGain())
            player.dilation.bestTP = player.dilation.bestTP.max(player.dilation.tachyonParticles)
            player.dilation.bestTPOverGhostifies = player.dilation.bestTPOverGhostifies.max(player.dilation.bestTP)
            document.getElementById('bestTP').textContent="Your best"+(ghostified ? "" : " ever")+" Tachyon particles"+(ghostified ? " in this Ghostify" : "")+" was "+shorten(player.dilation.bestTP)+"."
            setAndMaybeShow('bestTPOverGhostifies',ghostified,'"Your best-ever Tachyon particles was "+shorten(player.dilation.bestTPOverGhostifies)+"."')
            tmp.qu.notrelative = false
			player.dilation.br.cherenkovRadiation = player.dilation.br.cherenkovRadiation.plus(getCherenkovRadiationGen().times(diff/10))
		}
		if (document.getElementById('baryons').style.display != "none" && document.getElementById('ghostify').style.display != "none") {
			if (document.getElementById('nucleons').style.display != 'none') {
				document.getElementById('nucleonDarkness').textContent = shortenMoney(player.ghostify.darkness.amount)
				document.getElementById('protons').textContent = getFullExpansion(player.ghostify.baryons.nucleons.protons)
				document.getElementById('neutrons').textContent = getFullExpansion(player.ghostify.baryons.nucleons.neutrons)
				document.getElementById('buyProton').textContent = "Buy 1 Proton for " +shortenCosts(getNucleonCost('protons')) +' Darkness.'
				document.getElementById('buyProton').className = ((player.ghostify.darkness.amount.gte(getNucleonCost('protons'))) ? "gluonupgrade neutrinoupg" : 'gluonupgrade unavailablebtn') +' rad'
				document.getElementById('buyNeutron').textContent = "Buy 1 Neutron for " +shortenCosts(getNucleonCost('neutrons')) +' Darkness.'
				document.getElementById('buyNeutron').className = ((player.ghostify.darkness.amount.gte(getNucleonCost('neutrons'))) ? "gluonupgrade neutrinoupg" : 'gluonupgrade unavailablebtn') +' rad'
				document.getElementById('sacNucleonsAmount').textContent = getFullExpansion(player.ghostify.baryons.nucleons.sacrificed)
				document.getElementById('sacNucleonsReward').textContent = shorten(getSacNucEff())
				document.getElementById('sacNucleons').className = 'gluonupgrade ' +(player.ghostify.baryons.nucleons.protons+player.ghostify.baryons.nucleons.neutrons>player.ghostify.baryons.nucleons.sacrificed?'neutrinoupg':'unavailablebtn') +' rad'
			}
			if (document.getElementById('hyperons').style.display != 'none') {
				document.getElementById('hyperonsLocked').style.display = (player.ghostify.baryons.hyperons.unl) ? 'none' : ''
				document.getElementById('hyperonsStuff').style.display = (player.ghostify.baryons.hyperons.unl) ? '' : 'none'
				document.getElementById('sacNucleonsHyperons').textContent = getFullExpansion(player.ghostify.baryons.nucleons.sacrificed)
				hyperonsList = ['lambda','sigma','xi','omega']
				hyperonBuffs = ['Meta-Dimensions','TP gain','Ghost Dimensions','Darkness gain']
				hyperonNerfs = ['Quark gain','DT gain','Ghost Power translated to its effects','Free Electron gain']
				for (i=0;i<4;i++) {
					document.getElementById(hyperonsList[i]).textContent = hyperonsList[i] +' hyperon (' +getFullExpansion(player.ghostify.baryons.hyperons[hyperonsList[i]]) +')'
					document.getElementById(hyperonsList[i]).setAttribute('ach-tooltip','Boosts ' +hyperonBuffs[i] +' by ' +shorten(getHyperonBuff(hyperonsList[i],player.ghostify.baryons.hyperons[hyperonsList[i]]>0 || player.ghostify.baryons.hyperons.supercharge.active ? player.ghostify.baryons.hyperons[hyperonsList[i]] : getHyperonGain())) +'x and Nerfs ' +hyperonNerfs[i] +' by ' +shorten(getHyperonNerf(hyperonsList[i],player.ghostify.baryons.hyperons[hyperonsList[i]]>0  || player.ghostify.baryons.hyperons.supercharge.active ? player.ghostify.baryons.hyperons[hyperonsList[i]] : getHyperonGain())) +'x.')
					document.getElementById(hyperonsList[i]).className = currentAnnihilationTier()>0?"gluonupgrade unavailablebtn":((player.ghostify.baryons.hyperons[hyperonsList[i]]>0 || player.ghostify.baryons.hyperons.supercharge.active ? "gluonupgradebought" : "gluonupgrade") +" wzb")
				}
				document.getElementById("hyperonLimit").textContent = getFullExpansion(getHyperonGain(true))
				document.getElementById('supercharge').textContent = "Supercharged Hyperons (" +getFullExpansion(player.ghostify.baryons.hyperons.supercharge.hyperons) +")"
				document.getElementById("supercharge").className = getSuperchargingHyperons()==0 ? "gluonupgrade unavailablebtn" : ((player.ghostify.baryons.hyperons.supercharge.active ? "gluonupgradebought" : "gluonupgrade") +" wzb")
				document.getElementById('superchargeEff').textContent = getFullExpansion(Math.round(getSuperchargedHyperonsEff()*100)/100)
				document.getElementById('otherSuperchargeEffs').innerHTML = getOtherSuperchargeEffs(true)
			}
		}
		if (document.getElementById('annihilation').style.display != "none" && document.getElementById('ghostify').style.display != "none") {
			document.getElementById("annihilationLocked").style.display = player.ghostify.baryons.hyperons.supercharge.hyperons>4 ? "none" : ""
			document.getElementById("annihilationStuff").style.display = player.ghostify.baryons.hyperons.supercharge.hyperons>4 ? "" : "none"
			if (document.getElementById("annihilationmini").style.display != "none") {
				document.getElementById("annihilateInfo").innerHTML = "Annihilating your timeline forces you to do a Light Empowerment reset that also resets what Fixing Dilation resets. This also resets your Neutrinos, Light Empowerments, Darkness amount, Endless Mirror progress, and Ghost Dimensions (amounts are reset to bought amounts). Time Studies, Mastery Studies, most Dilation Studies, Dimensional Sacrifice, Quark Multipliers, and Brave Milestones are disabled while Annihilated. Any features unlocked by Dilation Studies that are not disabled (time dilation, meta dimensions, electrons, quantum and paired challenges, and big rip) are severely nerfed."+(player.ghostify.annihilation.maxTier>=2?"<br>Reach "+shorten(Number.MAX_SAFE_INTEGER)+" Exotic Matter to unlock something new... (not quite implemented yet, but will be soon)":"")
				document.getElementById("annihilate").textContent = player.ghostify.annihilation.active ? "You are too weak. Attempt to fix your weak timeline to gain " +shortenDimensions(getExoticMatterGain()) +" Exotic Matter." : "Annihilate your timeline at Tier "+getFullExpansion(player.ghostify.annihilation.tier)+"!"
				document.getElementById("exoticMatter").textContent = shortenDimensions(player.ghostify.annihilation.exoticMatter)
				document.getElementById("annihilateMaxTier").textContent = getFullExpansion(player.ghostify.annihilation.maxTier)
				document.getElementById("exoticMatterEff").textContent = getFullExpansion(Math.round((getExoticMatterEff()-1)*1000)/10) +((getAnnihilationRebuyableEff()>0) ? " + " +getFullExpansion(Math.round(getAnnihilationRebuyableEff()*1e3)/10)  : "")
				document.getElementById("annihilateMinus").className = player.ghostify.annihilation.tier>1&&currentAnnihilationTier()==0 ? "shortBtn" : "shortbtnlckd"
				document.getElementById("annihilatePlus").className = player.ghostify.annihilation.tier<player.ghostify.annihilation.maxTier&&currentAnnihilationTier()==0 ? "shortBtn" : "shortbtnlckd"
				updateAnnihilationUpgs()
			}
			if (document.getElementById("antibaryons").style.display != "none") updateAntiBaryons()
			document.getElementById("cascadetabbtn").style.display = player.ghostify.annihilation.cascade.times>0?"":"none"
			if (document.getElementById("cascade").style.display != "none") updateCascade(diff)
		}
		if (!player.ghostify.baryons.hyperons.unl && player.ghostify.baryons.nucleons.sacrificed>=20) player.ghostify.baryons.hyperons.unl = true
	}
}

function getDarknessSacReward() {
	if (player.aarexModifications.ngp5V === undefined || player.ghostify === undefined) return new Decimal(0)
	let reward = Decimal.pow(player.ghostify.ghostParticles.div('1e500'),0.02)
	if (reward.gte(1e6)) reward = Decimal.pow(reward,0.75).times(Decimal.pow(1e5,0.25))
	if (reward.gte(1e10)) reward = Decimal.sqrt(reward).times(Decimal.sqrt(1e10))
	if (reward.gte(1e25)) reward = Decimal.cbrt(reward).times(Decimal.pow(1e25,2/3))
	if (player.ghostify.darkness.upgrades[5][4] === true) reward = reward.times(getDarknessUpgReward(5,4)['reward'])
	if (player.ghostify.darkness.upgrades[5][5] === true) reward = reward.times(getDarknessUpgReward(5,5)['reward'])
	return Decimal.floor(reward)
}

function getFreeElectrons() {
	if (player.aarexModifications.ngp5V === undefined || player.ghostify === undefined) return 0
	let darkness = player.ghostify.darkness.amount
	if (player.ghostify.darkness.upgrades[1][1] === true) darkness = darkness.pow(getDarknessUpgReward(1,1)['reward'])
	if (player.ghostify.darkness.upgrades[2][3] === true) darkness = darkness.pow(getDarknessUpgReward(2,3)['reward'])
	if (player.ghostify.darkness.upgrades[4][5] === true) darkness = darkness.pow(getDarknessUpgReward(4,5)['reward'])
	let electrons = Math.pow(Decimal.log10(darkness.plus(1)),1.2)*1e5
	if (electrons>=1e5) electrons = Math.sqrt(electrons)*Math.sqrt(1e5)
	if (electrons>=1e7) electrons = Math.cbrt(electrons)*Math.pow(1e7,2/3)
	if (hasNU(22)) electrons *= 10
	electrons /= getHyperonNerf('omega').toNumber()
	return Math.floor(electrons)
}

function buyDarknessGen() {
	if (player.aarexModifications.ngp5V === undefined || player.ghostify === undefined) return
	if (getDarknessSacReward().lt(1)) return
	player.ghostify.darkness.generators = player.ghostify.darkness.generators.plus(getDarknessSacReward())
	player.ghostify.ghostParticles = new Decimal(0)
}

function getDarknessGen() {
	if (player.aarexModifications.ngp5V === undefined || player.ghostify === undefined) return new Decimal(0)
	let gain = player.ghostify.darkness.generators.pow(0.75)
	if (currentAnnihilationTier()>0) gain = player.ghostify.ghostlyPhotons.enpowerments>3 ? new Decimal(1) : new Decimal(0)
	if (player.ghostify.darkness.upgrades[0][2] === true) gain = gain.times(getDarknessUpgReward(0,2)['reward'])
	if (player.ghostify.darkness.upgrades[1][2] === true) gain = gain.times(getDarknessUpgReward(1,2)['reward'])
	if (player.ghostify.darkness.upgrades[1][4] === true) gain = gain.times(getDarknessUpgReward(1,4)['reward'])
	if (player.ghostify.darkness.upgrades[3][4] === true) gain = gain.times(getDarknessUpgReward(3,4)['reward'])
	if (player.ghostify.darkness.upgrades[3][5] === true) gain = gain.times(getDarknessUpgReward(3,5)['reward'])
	if (player.ghostify.darkness.upgrades[4][4] === true) gain = gain.times(getDarknessUpgReward(4,4)['reward'])
	if (hasNU(22)) gain = gain.times(player.quantum.electrons.amount+1)
	if (hasNU(24)) gain = gain.times(Decimal.pow(2,Math.min(player.dilation.br.cherenkovRadiation.plus(1).log10(),50)))
	gain = gain.times(getHyperonBuff('omega'))
	gain = gain.times(getOtherSuperchargeEffs()[3])
	gain = gain.times(getOtherSuperchargeEffs()[5])
	if (player.achievements.includes("ng5p14") && player.ghostify.darkness.amount.lt(1e12)) gain = gain.times(10)
	if (player.achievements.includes("ng5p15")) gain = gain.times(25)
	gain = gain.times(getAntiBaryonEff("antiprotons"))
	return gain
}

var durows = 6
var ducols = 6

function buildDarknessTable() {
	let rows = durows
	let cols = ducols
	let table = ""
	for (r=0;r<rows;r++) {
		if (player.ghostify.darkness.upgrades[r] === undefined || !Array.isArray(player.ghostify.darkness.upgrades[r])) player.ghostify.darkness.upgrades[r] = []
		table+="<tr id=darknessRow"+(r+1)+">"
		for (i=0;i<cols;i++) {
			if (player.ghostify.darkness.upgrades[r][i] === undefined) player.ghostify.darkness.upgrades[r][i] = false
			table+="<td align='center'><button class='darkness gluonupgrade' style='font-size:9px !important' id='buyDU"+r+','+i+"' onclick='buyDarknessUpg("+r+","+i+")'>"
			table+=getDarknessUpgDesc(r,i)
			table+="<br>"
			table+="Cost: <span id='DU"+r+","+i+"cost'></span> Darkness."
			table+="<br>"
			table+="Currently: <span id='DU"+r+","+i+"current'></span>"
			table+="</button></td>"
		}
		table+="</tr>"
	}
	document.getElementById('darknessUpgs').innerHTML = table
}

function updateDarknessUpgs() {
	let rows = durows
	let cols = ducols
	let preTxts = [['','','','','',''],['','+','','','',''],['+','+','+','+','',''],['-','+','','','',''],['+','-','','','','+'],['','','','+','','']]
	let aftTxts = [['x','x','x','x','x','x'],['x','%','x','x','x','x'],['%','%','%','%','x','x'],['%','','x','x','x','x'],['','%','x','x','x','%'],['x','x','x','%','x','x']]
	for (r=0;r<rows;r++) {
		i = 0
		while (i<cols) {
			document.getElementById('buyDU'+r+','+i).className = player.ghostify.darkness.amount.lt(getDarknessUpgCost(r,i)) && player.ghostify.darkness.upgrades[r][i] === false ? "darknesslocked gluonupgrade" : ("darkness " +(player.ghostify.darkness.upgrades[r][i] === true ? "gluonupgradebought" : "gluonupgrade"))
			document.getElementById('DU'+r+','+i+'cost').textContent = shortenCosts(getDarknessUpgCost(r,i))
			let reward = getDarknessUpgReward(r,i)['reward']
			if (preTxts[r][i]=='+'&&aftTxts[r][i]=='%') reward = nM(nS(reward,1),100)
			if (preTxts[r][i]=='-'&&aftTxts[r][i]=='%') {
				reward = nM(nS(1,reward),100)
				if (nG(reward,0)) preTxts[r][i]='+'
				else preTxts[r][i]=''
			}
			i = Math.min(i,cols-1)
			document.getElementById('DU'+r+','+i+'current').textContent = preTxts[r][i]+(getDarknessUpgReward(r,i)['type']=="decimal" ? shorten(reward) : getFullExpansion(Math.round(reward*100)/100))+(aftTxts[r][i]===undefined?'x':aftTxts[r][i])
			i+=1
		}
	}
	document.getElementById("darknessRow6").style.display = (player.ghostify.dimensions.bought[8]>0) ? "" : "none"
}

function getDarknessUpgDesc(row,col) {
	let descs = []
	descs[0] = []
	descs[0].push('Nanofield does not need to be active to gain Preon Charge, and you gain more Preon Charge based on your GHP.')
	descs[0].push('You gain more Ghostly Photons and Dark Matter based on your Darkness.')
	descs[0].push('You gain more Darkness based on your Light Empowerments.')
	descs[0].push('You gain more Ghostly Photons and Dark Matter based on your GHP.')
	descs[0].push('Meta-Dimension Boosts do not reset your Meta-Dimensions, and they are more powerful based on your Darkness.')
	descs[0].push('You gain 1% of Banked Infinities and Banked Eternities per second, and you gain more of both based on your GHP.')
	descs[1] = []
	descs[1].push('Anything that boosts Odd Emperor Dimensions also boosts Even Emperor Dimensions, and all Emperor Dimensions are boosted by your GHP.')
	descs[1].push('More of your Darkness is translated to Free Electron gain based on your Darkness amount.')
	descs[1].push('You gain more Darkness based on your Preons.')
	descs[1].push('All Emperor Dimensions are boosted by your Light Empowerments.')
	descs[1].push('You gain more Darkness based on your Dimension Boosts.')
	descs[1].push('You gain more Ghostly Photons and Dark Matter based on your GHP.')
	descs[2] = []
	descs[2].push('TS262, TS263, TS264, and TS344 are more powerful based on your GHP.')
	descs[2].push('TS341 is more powerful based on your Darkness.')
	descs[2].push('Unlock Ghostly Challenges, and TS431 is more powerful based on your Galaxies.')
	descs[2].push('More of your Darkness is translated to Free Electron gain based on your Galaxies.')
	descs[2].push('You gain more Neutrinos based on your Darkness.')
	descs[2].push('You gain more GHP based on your Total Lights.')
	descs[3] = []
	descs[3].push('Dimension Supersonic scaling is weaker based on your Darkness.')
	descs[3].push('Ghostly Replicated Galaxy cost scaling starts later based on your Darkness.')
	descs[3].push('Emperor Dimensions are stronger based on your Galaxies.')
	descs[3].push('Meta Dimensions are stronger based on your Preons.')
	descs[3].push('You gain more Darkness based on your non-free Electrons.')
	descs[3].push('You gain more Darkness based on your Total Lights.')
	descs[4] = []
	descs[4].push('In non-Big Rips, Free tickspeed upgrade requirement scaling starts later based on your GHP.')
	descs[4].push('In non-Big Rips, Free tickspeed upgrade requirement scaling is slower based on your Time Theorems.')
	descs[4].push('Dilated Time gain is boosted by your GHP.')
	descs[4].push('Tachyon Particle gain is boosted by your Time Theorems.')
	descs[4].push('Darkness gain is boosted by your GHP.')
	descs[4].push('More of your Darkness is used for Free Electrons based on your Time Theorems.')
	descs[5] = []
	descs[5].push('Emperor Dimensions are boosted by your permanent Eighth Emperor Dimensions.')
	descs[5].push('TP gain '+(player.ghostify.endlessMirrors.amount>0 ? " and Refracted Light gain are " : "is ")+'boosted by your Infinity Power.')
	descs[5].push('GHP gain is boosted by your Eternal Matter.')
	descs[5].push('Dilation Rebuyable cost scaling starts later based on your Quantum Worth.')
	descs[5].push('You gain more Darkness Generators based on your GHP.')
	descs[5].push('You gain more Darkness Generators based on your Time Theorems.')
	return descs[row][col]
}

function getDarknessUpgCost(row,col) {
	let costs = [[1e3,1e4,1e5,1.5e7,1e10,1e14],[1e6,1e7,1e8,1e9,1e12,1e16],[1e9,1e10,1e11,1e12,1e14,1e20],[1e13,1e15,1e17,1e20,1e23,1e27],[1e18,1e21,1e24,1e28,1e32,1e37],[1e68,1e72,1e78,1e85,1e95,1e100]]
	return new Decimal(costs[row][col])
}

function getDarknessUpgRewardSCS(reward,x,y,d) {
	if (d) {
		if (reward.gte(x)) reward = reward.pow(1/3).times(Decimal.pow(x,2/3))
		if (reward.gte(y)) reward = new Decimal(Decimal.log10(reward)/Decimal.log10(y)).times(y)
	} else {
		if (reward>=x) reward = Math.pow(reward,1/3)*Math.pow(x,2/3)
		if (reward>=y) reward = y*Math.log10(reward)/Math.log10(y)
	}
	return reward
}

function getDarknessUpgReward(row,col) {
	let reward = 1
	if (row==0) {
		if (col==0) {
			reward = player.ghostify.ghostParticles.plus(1).pow(0.02)
			reward = getDarknessUpgRewardSCS(reward,1e20,1.79e308,reward instanceof Decimal)
		}
		if (col==1) {
			reward = player.ghostify.darkness.amount.plus(1).pow(0.2)
			reward = getDarknessUpgRewardSCS(reward,1e9,1e25,reward instanceof Decimal)
		}
		if (col==2) {
			reward = Decimal.pow(2,player.ghostify.ghostlyPhotons.enpowerments)
			reward = getDarknessUpgRewardSCS(reward,1e20,1e100,reward instanceof Decimal)
		}
		if (col==3) {
			reward = Decimal.pow(player.ghostify.ghostParticles.plus(1).log10()+1,0.5)
			reward = getDarknessUpgRewardSCS(reward,100,1e10,reward instanceof Decimal)
		}
		if (col==4) {
			reward = Decimal.pow(player.ghostify.darkness.amount.plus(1).log10()+1,0.75)
			reward = getDarknessUpgRewardSCS(reward,1e5,1e25,reward instanceof Decimal)
		}
		if (col==5) {
			reward = Decimal.pow(player.ghostify.ghostParticles.plus(1).log10()+1,100)
			reward = getDarknessUpgRewardSCS(reward,Number.MAX_VALUE,new Decimal('1e1000'),reward instanceof Decimal)
		}
	}
	if (row==1) {
		if (col==0) {
			reward = player.ghostify.ghostParticles.plus(1).pow(0.077)
			reward = getDarknessUpgRewardSCS(reward,1e50,1e250,reward instanceof Decimal)
		}
		if (col==1) {
			reward = Math.log10(Decimal.log10(player.ghostify.darkness.amount.plus(1))+1)+1
			reward = getDarknessUpgRewardSCS(reward,1.5,2,reward instanceof Decimal)
		}
		if (col==2) {
			reward = Decimal.pow(player.quantum.replicants.quarks.plus(1).log10()+1,0.4)
			reward = getDarknessUpgRewardSCS(reward,100,1e25,reward instanceof Decimal)
		}
		if (col==3) {
			reward = Decimal.pow(2,player.ghostify.ghostlyPhotons.enpowerments)
			reward = getDarknessUpgRewardSCS(reward,1e20,1e100,reward instanceof Decimal)
		}
		if (col==4) {
			reward = Decimal.pow(1.0000001,player.resets)
			reward = getDarknessUpgRewardSCS(reward,100,1e10,reward instanceof Decimal)
		}
		if (col==5) {
			reward = Decimal.pow(player.ghostify.ghostParticles.plus(1).log10()+1,1.0456)
			reward = getDarknessUpgRewardSCS(reward,1e3,1e10,reward instanceof Decimal)
		}
	}
	if (row==2) {
		if (col==0) {
			reward = Math.max(Math.pow(player.ghostify.ghostParticles.plus(1).log10(),0.000000000000000001)+0.0033,1)
			reward = getDarknessUpgRewardSCS(reward,1.00001,1.001,reward instanceof Decimal)
		}
		if (col==1) {
			reward = Math.pow(player.ghostify.darkness.amount.plus(1).log10(),0.2)+1
			reward = getDarknessUpgRewardSCS(reward,1.5,2,reward instanceof Decimal)
		}
		if (col==2) {
			reward = Math.pow(player.galaxies+1,0.1)
			reward = getDarknessUpgRewardSCS(reward,1.5,2,reward instanceof Decimal)
		}
		if (col==3) {
			reward = Math.log10(player.galaxies+1)+1
			reward = getDarknessUpgRewardSCS(reward,1.2,1.5,reward instanceof Decimal)
		} 
		if (col==4) {
			reward = new Decimal(player.ghostify.darkness.amount.plus(1).log10()).plus(1)
			reward = getDarknessUpgRewardSCS(reward,20,500,reward instanceof Decimal)
		} 
		if (col==5) {
			reward = Decimal.pow(getTotalLights()+1,10)
			reward = getDarknessUpgRewardSCS(reward,1e50,Number.MAX_VALUE,reward instanceof Decimal)
		}
	}
	if (row==3) {
		if (col==0) {
			reward = Math.pow(player.ghostify.darkness.amount.plus(1).log10(),0.075)
			reward = getDarknessUpgRewardSCS(reward,1.25,1.5,reward instanceof Decimal)
		}
		if (col==1) {
			reward = Math.pow(player.ghostify.darkness.amount.plus(1).log10(),2.3)*100
			reward = getDarknessUpgRewardSCS(reward,200000,500000,reward instanceof Decimal)
		}
		if (col==2) {
			reward = Decimal.pow(1.0001,player.galaxies)
			reward = getDarknessUpgRewardSCS(reward,1e100,Number.MAX_VALUE,reward instanceof Decimal)
		}
		if (col==3) {
			reward = Decimal.pow(player.quantum.replicants.quarks.plus(1).log10()+1,100)
			reward = getDarknessUpgRewardSCS(reward,new Decimal('1e1000'),new Decimal('1e2250'),reward instanceof Decimal)
		}
		if (col==4) {
			reward = Decimal.pow(player.quantum.electrons.amount+1,0.25)
			reward = getDarknessUpgRewardSCS(reward,10,1e10,reward instanceof Decimal)
		}
		if (col==5) {
			reward = Decimal.pow(getTotalLights()+1,0.5)
			reward = getDarknessUpgRewardSCS(reward,1e3,1e10,reward instanceof Decimal)
		}
	}
	if (row==4) {
		if (col==0) { 
			reward = Math.log10(Math.pow(player.ghostify.ghostParticles.plus(1).log10(),2)+1)*25e7
			reward = Math.floor(getDarknessUpgRewardSCS(reward,1e9,1e10,reward instanceof Decimal))
		}
		if (col==1) {
			reward = Math.min(Math.log10(Math.log10(player.timestudy.theorem+1)+1)*0.01+1,1.5)
			reward = getDarknessUpgRewardSCS(reward,1.1,1.2,reward instanceof Decimal)
		}
		if (col==2) {
			reward = player.ghostify.ghostParticles.plus(1).pow(0.1)
			reward = getDarknessUpgRewardSCS(reward,1e100,Number.MAX_VALUE,reward instanceof Decimal)
		}
		if (col==3) {
			reward = Math.pow(player.timestudy.theorem+1,0.9)
			reward = getDarknessUpgRewardSCS(reward,1e100,Number.MAX_VALUE,reward instanceof Decimal)
		} 
		if (col==4) {
			reward = Decimal.pow(player.ghostify.ghostParticles.plus(1).log10(),2).plus(1)
			reward = getDarknessUpgRewardSCS(reward,1e5,1e10,reward instanceof Decimal)
		}
		if (col==5) {
			reward = Math.log10(player.timestudy.theorem+1)*0.001+1
			reward = getDarknessUpgRewardSCS(reward,1.2,2,reward instanceof Decimal)
		} 
	} 
	if (row==5) {
		if (col==0) {
			reward = Decimal.pow(1.0001,player.quantum.emperorDimensions[8].perm)
			reward = getDarknessUpgRewardSCS(reward,Decimal.pow(10,250),Number.MAX_VALUE,reward instanceof Decimal)
		}
		if (col==1) {
			reward = Decimal.max(Decimal.pow(3,Math.log10(player.infinityPower.plus(1).log10()+1)).pow(0.5).times(Decimal.pow(3,Math.log10(Decimal.pow(10,1e18).log10()+1)).pow(0.5)),1)
			reward = getDarknessUpgRewardSCS(reward,1e200,Number.MAX_VALUE,reward instanceof Decimal)
		}
		if (col==2) {
			reward = player.quantum.breakEternity.eternalMatter.plus(1).pow(0.9)
			reward = getDarknessUpgRewardSCS(reward,Decimal.pow(10,2500),Decimal.pow(10,10000),reward instanceof Decimal)
		}
		if (col==3) {
			reward = Decimal.log10(Decimal.pow(quantumWorth.plus(1).log10()+1,0.1))+1
			reward = getDarknessUpgRewardSCS(reward,1000,1e4,reward instanceof Decimal)
		}
		if (col==4) {
			reward = Decimal.pow(player.ghostify.ghostParticles.plus(1).log10()+1,1.44)
			reward = getDarknessUpgRewardSCS(reward,Decimal.pow(10,20),Decimal.pow(10,45),reward instanceof Decimal)
		}
		if (col==5) {
			reward = Math.cbrt(player.timestudy.theorem+1)
			reward = getDarknessUpgRewardSCS(reward,1e10,1e25,reward instanceof Decimal)
		}
	}
	let decimal = reward instanceof Decimal
	if (decimal) reward = new Decimal(reward)
	return {type: (decimal ? "decimal" : "int"), reward: reward}
}

function buyDarknessUpg(row,col) {
	if (player.ghostify.darkness.amount.lt(getDarknessUpgCost(row,col)) || player.ghostify.darkness.upgrades[row][col] === true) return
	player.ghostify.darkness.amount = player.ghostify.darkness.amount.minus(getDarknessUpgCost(row,col))
	player.ghostify.darkness.upgrades[row][col] = true
}

function updateGC(x) {
	let effects = [NaN]
	effects.push('Color Powers do nothing, and all Meta Dimension multipliers are brought to the ' +shorten(getGCNerf(1).pow(-1)) +'th root.')
	effects.push('QK Mults do nothing, all ToD Upgrades are much weaker, you are trapped in QC2, and all Infinity and Emperor Dimension multipliers are brought to the ' +shorten(getGCNerf(2).pow(-1)) +'th root.') 
	effects.push('Infinity Power, Free Tickspeed Upgrades, and Meta Antimatter do nothing, Replicate Chance cannot pass 100%, Ghostly Galaxy is stuck at full effect, most Mastery Studies do nothing, you are trapped in QC4, and Normal Dimensions are brought to the '+shorten(getGCNerf(3).pow(-1))+'th root.') 
	effects.push('Tickspeed upgrades do almost nothing, Remote Galaxy cost scaling is reactivated and starts instantly and is much stronger, you are trapped in QC5, and all Infinity Dimensions are brought to the '+shorten(getGCNerf(4).pow(-1))+'th root.') 
	let rewards = [NaN]
	rewards.push('Meta Dimension Boosts are ' +shorten(getGCReward(1)) +'x more powerful.')
	rewards.push('Tree Upgrades are ' +shorten(getGCReward(2)) +'x more powerful.')
	rewards.push('Most Mastery Studies are '+shorten(getGCReward(3))+'x more powerful.')
	rewards.push('Normal Galaxies are '+shorten(getGCReward(4))+'x more powerful.')
	document.getElementById('gc'+x+'effect').textContent = effects[x]
	if (player.ghostify.challenges.completed !== undefined) {
		document.getElementById('gc'+x).textContent =inGC(x)?"Running":player.ghostify.challenges.completed.includes(x)?"Completed":"Start"
		document.getElementById('gc'+x).className=inGC(x)?"onchallengebtn":player.ghostify.challenges.completed.includes(x)?"completedchallengesbtn":"challengesbtn"
	} 
	if (player.ghostify.challenges.tiers !== undefined) {
		document.getElementById('gc'+x+'tier').textContent = "Tier: " +getFullExpansion(player.ghostify.challenges.tiers[x-1])
	}
	document.getElementById('gc'+x+'goal').textContent = "Goal: " +shortenMoney(getGCGoal(x)) +" Quantum Worth."
	document.getElementById('gc'+x+'reward').textContent = "Reward: " +rewards[x]
}

function getGCNerf(x) {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	let intensity = player.ghostify.challenges.tiers[x-1]
	if (intensity>=10) intensity = Math.pow(intensity,1.1)*intensity
	let nerf = new Decimal(1)
	if (x==1) nerf = Decimal.pow(0.4,(intensity>=5?Math.sqrt(intensity-0.8)*Math.sqrt(5):intensity)+1)
	if (x==2) nerf = Decimal.pow(1/3,intensity+1)
	if (x==3) nerf = Decimal.pow(0.1,intensity+2)
	if (x==4) nerf = Decimal.pow(0.2,Math.pow(intensity+1,2))
	return nerf
}

function inGC(x) {
	if (player.aarexModifications.ngp5V === undefined) return false
	let active = false
	if (player.ghostify.challenges.active == x) active = true
	return active
}

function getGCGoal(x) {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	let goals = [NaN,new Decimal('1e1200'),new Decimal('1e1600'),new Decimal('1e2000'),new Decimal('1e2400')]
	let bases = [NaN,1.2,1.35,1.4,1.1]
	let sp = [NaN,1,1.5,1.64,2]
	sp = sp[x]
	let tier = player.ghostify.challenges.tiers[x-1]
	if (tier>=5*sp) tier = Math.pow(tier,2)/(5*sp)
	if (tier>=10*sp) tier = Math.pow(1.1,tier)+tier-Math.pow(1.1,10*sp)
	if (tier>=20*sp) tier = Math.pow(tier,1.05)*tier
	goals[x] = goals[x].pow(Decimal.pow(bases[x],tier))
	return goals[x]
}

function getGCReward(x) {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	if (!inGC(0)) return new Decimal(1)
	let intensity = player.ghostify.challenges.tiers[x-1]
	if (intensity>=10) intensity = Math.sqrt(intensity)*Math.sqrt(10)
	let reward = new Decimal(1)
	if (x==1) reward = Decimal.pow(100,intensity)
	if (x==2) reward = Decimal.pow(1.1,intensity)
	if (x==3) reward = Decimal.min(Decimal.pow(1.01,intensity),2)
	if (x==4) reward = Decimal.min(new Decimal(1+0.01*intensity),10)
	return reward
}

function startGhostlyChall(x) {
	if (player.aarexModifications.ngp5V === undefined) return
	if (currentAnnihilationTier()>0) return
	ghostifyReset(false,0,0,true)
	player.ghostify.challenges.active = x
	updateQuantumChallenges()
	updateGC(x)
}

function getFreeTickUpgrades() {
	let ticks = player.timeShards.div(getTickThreshold(player.totalTickGained*(-1))).log(getTickThresholdMult())
	if (ticks>=getFTUSS()) ticks = Math.pow(ticks,Math.pow(Math.pow(getFTUSP(),-1),getFTURK()))*Math.pow(getFTUSS()*getFTURK(),1-Math.pow(Math.pow(getFTUSP(),-1),getFTURK()))
	if (player.aarexModifications.ngp5V !== undefined) if (inGC(3)) ticks = 0
	return Math.floor(ticks)
}

function getFTUSS() {
	let ss = 13e9
	if (player.aarexModifications.ngp5V !== undefined) if (player.ghostify.darkness.upgrades[4][0] === true) ss += getDarknessUpgReward(4,0)['reward']
	if (player.masterystudies !== undefined) if (player.quantum.bigRip.active) {
		ss = 1.3e6
		if (player.quantum.breakEternity.upgrades.includes(13)) ss += 4e5
	}
	if (currentAnnihilationTier()>0) ss /= 12*currentAnnihilationTier()
	return ss
}

function getFTUSP() {
	let power = 1
	if (player.aarexModifications.ngp5V !== undefined) if (player.ghostify.darkness.upgrades[4][1] === true) power /= getDarknessUpgReward(4,1)['reward']
	if (currentAnnihilationTier()>0) power *= currentAnnihilationTier()+1
	return power+1
}

function getFTURK() {
	let rk = 0
	if (player.totalTickGained>=getFTUSS()) rk = Math.floor((player.totalTickGained-getFTUSS())/getFTUSS()+1)
	return rk
}

function getTickThresholdMult() {
	let thresholdMult = player.timestudy.studies.includes(171)?1.25:1.33
    if (player.galacticSacrifice!==undefined&&!(player.aarexModifications.ngmX>3)) thresholdMult=player.timestudy.studies.includes(171)?1.1:1.15
    if (QCIntensity(7)) thresholdMult *= getQCReward(7)
	return thresholdMult
}

function getTickThreshold(inc=0) {
	let threshold = Decimal.pow(getTickThresholdMult(),player.totalTickGained+inc).times(player.aarexModifications.ngmX>3?0.01:1)
	return threshold
}

function getFreeTickPower() {
	if (player.aarexModifications.ngp5V === undefined) return 1
	return getExoticMatterEff()+getAnnihilationRebuyableEff()
}

function getLightEnergyGen() {
	let divisor = new Decimal(250)
	if (currentAnnihilationTier()>0) divisor = divisor.pow(currentAnnihilationTier()+1)
	let gen = Decimal.div(getTotalLights(),divisor)
	gen = gen.times(getLightEnergyMult())
	gen = gen.times(getRefractionRebuyableMult())
	if (hasNU(18)) gen = gen.times(Decimal.pow(1+(0.1/(currentAnnihilationTier()+1)),player.ghostify.dimensions.power.plus(1).log10()))
	if (gen.eq(1/0)) gen = new Decimal(0)
	return gen
}

function getEndlessMirrorData() {
	var em = player.ghostify.endlessMirrors
	var cost = function() {
		let cost = new Decimal(20)
		let base = new Decimal(5)
		if (player.quantum.breakEternity.upgrades.includes(12)) base = new Decimal(4)
		if (currentAnnihilationTier()>0) base = base.pow(currentAnnihilationTier()+1)
		cost = cost.times(Decimal.pow(base,em.amount))
		return cost
	}
	var prod = function() {
		let a = em.amount
		if (player.quantum.bigRip.upgrades.includes(12)) a *= 2
		if (currentAnnihilationTier()>0) a /= currentAnnihilationTier()*2+1
		let prod = Decimal.pow(1.5,a).minus(1)
		return prod
	}
	return {cost: cost(), prod: prod()}
}

function buyEndlessMirror() {
	let cost = getEndlessMirrorData().cost
	if (player.ghostify.endlessMirrors.lightEnergy.lt(cost)) return 
	player.ghostify.endlessMirrors.lightEnergy = player.ghostify.endlessMirrors.lightEnergy.minus(cost)
	player.ghostify.endlessMirrors.amount += 1
}

function getRefractionFactor() {
	let energy = player.ghostify.endlessMirrors.refraction.energy
	let factor = new Decimal(1)
	if (player.quantum.breakEternity.upgrades.includes(11)) factor = energy.pow(1/3).plus(energy.plus(1).log2())
	else factor = new Decimal(energy.plus(1).log2())
	factor = factor.times(getBDUpgEff(15))
	return factor
}

function getRefractedLightGain() {
	let gain = Decimal.mul(getTotalLights(),getRefractionFactor())
	if (player.ghostify.darkness.upgrades[5][1] === true) gain = gain.times(getDarknessUpgReward(5,1)['reward'])
	return gain
}

function getMDBRR() {
	let r = new Decimal(1)
	let exp = 0.2
	if (hasNU(18)) exp += 0.3
	r = Decimal.pow(player.ghostify.endlessMirrors.refraction.light,exp).plus(1)
	return r
}

function getLightEnergyMult() {
	let m = new Decimal(1)
	let exp = 1.1
	if (hasNU(18)) exp += 0.5
	if (currentAnnihilationTier()>0) exp /= currentAnnihilationTier()*0.1+1
	m = new Decimal(1).plus(Decimal.pow(player.ghostify.endlessMirrors.refraction.light,exp).plus(1).log(1.1))
	return m
}

function getRefractionRebuyableCost() {
	let amount = player.ghostify.endlessMirrors.refraction.rebuyable
	if (player.quantum.breakEternity.upgrades.includes(13)) amount = amount*0.78
	if (player.ghostify.endlessMirrors.refraction.rebuyable>=10) amount = Math.pow(amount,2)/10
	let amount2 = 0
	if (player.ghostify.endlessMirrors.refraction.rebuyable>=100) amount2 = Math.pow(player.ghostify.endlessMirrors.refraction.rebuyable-100,1+Math.log10(player.ghostify.endlessMirrors.refraction.rebuyable-99))
	amount += amount2
	let cost = Decimal.pow(1.2,amount).times(500)
	return cost
}

function getRefractionRebuyableMult() {
	let mult = Decimal.pow(2,player.ghostify.endlessMirrors.refraction.rebuyable)
	return mult
}

function buyRefractionRebuyable() {
	let cost = getRefractionRebuyableCost()
	if (player.ghostify.endlessMirrors.refraction.energy.lt(cost)) return 
	player.ghostify.endlessMirrors.refraction.energy = player.ghostify.endlessMirrors.refraction.energy.minus(cost)
	player.ghostify.endlessMirrors.refraction.rebuyable += 1
}

function getGhostPowerEff() {
	let power = player.ghostify.dimensions.power
	power = power.div(getHyperonNerf('xi'))
	if (power.gte(Number.MAX_VALUE)) power = Decimal.pow(power, 0.2).times(Decimal.pow(Number.MAX_VALUE, 0.8))
	let exp = 2
	if (hasNU(21)) exp += 0.5
	let eff = Math.pow(Math.log2(power.plus(1).log10()+1),exp)
	if (isBigRipUpgradeActive(23)) {
		let r1 = Math.log10(Math.log10(player.galaxies+1)+1)+1
		let r2 = Math.sqrt(Math.log10(player.galaxies+1)/10+1)
		eff *= r1
		if (player.achievements.includes("ng5p35")) eff *= r2
	}
	return Math.floor(eff)
}

function getGhostPowerEff2() {
	let power = player.ghostify.dimensions.power
	power = power.div(getHyperonNerf('xi'))
	if (power.gte(Number.MAX_VALUE)) power = Decimal.pow(power, 0.2).times(Decimal.pow(Number.MAX_VALUE, 0.8))
	let exp = 1.25
	if (hasNU(21)) exp += 0.25
	let eff = Math.pow(power.plus(1).log10(),exp)
	if (isBigRipUpgradeActive(22)) {
		let r1 = Math.log10(player.galaxies+1)/3+1
		let r2 = Math.sqrt(player.galaxies/1e3+1)
		eff *= r1
		if (player.achievements.includes("ng5p34")) eff *= r2
	}
	if (eff>=50000) eff = Math.sqrt(eff)*Math.sqrt(50000)
	return Math.floor(eff)
}

function getGhostPowerEff3() {
	let power = player.ghostify.dimensions.power
	power = power.div(getHyperonNerf('xi'))
	if (power.gte(Number.MAX_VALUE)) power = Decimal.pow(power, 0.2).times(Decimal.pow(Number.MAX_VALUE, 0.8))
	let exp = 0.05
	if (hasNU(19)) exp += 0.01
	if (hasNU(21)) exp += 0.01
	let eff = Decimal.pow(power.plus(1),exp)
	return eff
}

function getBRDBLim() {
	let lim = 4
	if (player.aarexModifications.ngp5V !== undefined && bigRipped) {
		if (player.quantum.breakEternity.upgrades.includes(11) && player.currentEternityChall !== 'eterc10') lim = 5
		let gpe2 = getGhostPowerEff2()
		if (player.currentEternityChall == 'eterc10') gpe2 = 0
		lim += gpe2
	}
	return lim
}

function getNanofieldRewards() {
	let rewards = player.quantum.nanofield.rewards
	if (player.aarexModifications.ngp5V !== undefined) rewards += getGhostPowerEff()
	return rewards
}

function ghostDimData(d) {
	let dims = player.ghostify.dimensions
	var mult = function() {
		let mult = Decimal.pow(ghostDimData(d).mpt(),dims.bought[d])
		if (hasNU(16)) mult = mult.times(player.achPow)
		mult = mult.times(getBDUpgEff(2))
		mult = mult.times(getHyperonBuff('xi'))
		return mult
	}
	var mpt = function() {
		let mpt = new Decimal(2)
		mpt = mpt.plus(getSpiritEff())
		return mpt
	}
	var cost = function() {
		var inc = function() {
			let inc = Decimal.pow(Math.pow(Number.MAX_VALUE,0.1),d-1).times(Number.MAX_VALUE)
			return inc
		}
		var start = function(){
			let s = [null,new Decimal('1e4000'),new Decimal('1e4500'),new Decimal('1e5000'),new Decimal('1e6000'),new Decimal('1e7600'),new Decimal('1e8200'),new Decimal('1e9000'),new Decimal('1e9500')]
			return s[d].div('1e500')
		}
		var ss = function(){
			let ss = [null,new Decimal('1e14000'),new Decimal('1e15000'),new Decimal('1e16000'),new Decimal('1e17000'),new Decimal('1e18000'),new Decimal('1e20000'),new Decimal('1e22500'),new Decimal('1e25000')]
			return ss[d]
		}
		var exp = function(){
			let exps = [null,3,3,3,3,3,3,3,3]
			return exps[d]
		}
		let cost = Decimal.pow(inc(),dims.bought[d]).times(start())
		if (cost.gte(ss())) cost = Decimal.pow(Decimal.pow(inc(),dims.bought[d]).times(start()), exp()).div(Decimal.pow(ss(), exp()-1))
		return {cost: cost, inc: inc, start: start, ss: ss, exp: exp}
	}
	return {mult: mult, mpt: mpt, cost: cost}
}

function buyGhostDim(d,bulk=false) {
	let data = ghostDimData(d)
	let c = ghostDimData(d).cost()
	if (player.ghostify.ghostParticles.lt(c.cost)) return
	target = player.ghostify.dimensions.bought[d]
	inc = 0
	if (bulk) {
		target = Decimal.log10(player.ghostify.ghostParticles.div(c.start()).add(1))/Decimal.log10(c.inc()) + 1
		let cost2 = Decimal.pow(c.inc(),target-1).times(c.start())
		if (c.cost.gte(c.ss()) || cost2.gte(c.ss())) {
			target = Math.min(player.ghostify.ghostParticles.times(Decimal.pow(c.ss(), c.exp()-1)).pow(1/c.exp()).div(c.start()).add(1).log10()/Decimal.log10(c.inc()) + 1, Decimal.log10(player.ghostify.ghostParticles.div(c.start()).add(1))/Decimal.log10(c.inc()) + 1)
		}
		inc = target - player.ghostify.dimensions.bought[d]
	} else {
		target = player.ghostify.dimensions.bought[d]+1
		inc = 1
	}
	target = Math.floor(target)
	inc = Math.floor(inc)
	player.ghostify.ghostParticles = player.ghostify.ghostParticles.minus(c.cost)
	player.ghostify.dimensions.bought[d] += inc
	player.ghostify.dimensions.amount[d] = player.ghostify.dimensions.amount[d].plus(inc)
}

function maxAllGhostDims() {
	for (i=8;i>=1;i--) buyGhostDim(i,true)
}

function getSpiritRequirement() {
	let req = 5+Math.pow(player.ghostify.dimensions.spirits,2)*5
	req -= getSpiritReqSub()
	return Math.max(req, 0)
}

function getSpiritReqSub() {
	let sub = 0
	if (player.aarexModifications.ngp5V !== undefined) {
		if (player.ghostify.annihilation.upgrades.includes(31)) sub += 15
	}
	return sub
}

function spiritReset(bulk=false) {
	if (player.ghostify.dimensions.bought[8]<getSpiritRequirement()) return
	if (bulk) {
		let target = Math.floor(Math.sqrt((player.ghostify.dimensions.bought[8]-5+getSpiritReqSub())/5)+1)
		let inc = target - player.ghostify.dimensions.spirits
		player.ghostify.dimensions.spirits += inc
	} else {
		player.ghostify.dimensions.spirits += 1
	}
	player.ghostify.dimensions = {
		amount: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
		bought: [null,0,0,0,0,0,0,0,0],
		power: new Decimal(0),
		spirits: player.ghostify.dimensions.spirits,
	}
}

function getSpiritEff() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(0)
	let spirits = player.ghostify.dimensions.spirits
	if (player.achievements.includes("ng5p36")) spirits += Math.pow(player.ghostify.ghostlyPhotons.enpowerments, 0.2)/5
	let eff = new Decimal(spirits).times(0.5)
	eff = Decimal.pow(eff,3).plus(0.375*spirits)
	return eff
}

function breakDilation() {
	if (currentAnnihilationTier() > 0 && !hasAnnihilationUpg(24)) return
	player.dilation.active = false
	if (player.dilation.br['break']) {
		if (currentAnnihilationTier()==0) ghostifyReset(false,0,0,true)
		else quantum(false, true, 0, false)
		player.dilation.br.cherenkovRadiation = new Decimal(0)
		player.dilation.tachyonParticles = new Decimal(0)
		player.dilation.totalTachyonParticles = new Decimal(0)
		player.dilation.bestTP = new Decimal(0)
		player.dilation.br['break'] = false
	} else {
		player.dilation.br['break'] = true
	}
}

function getCherenkovRadiationGen() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	if (!player.dilation.br['break']) return new Decimal(0)
	let eff = player.dilation.tachyonParticles.div(Number.MAX_VALUE).pow(0.01).div(1e6)
	eff = eff.times(getBDUpgEff(4)).times(getBDUpgEff(5)).times(getBDUpgEff(6)).times(getBDUpgEff(13))
	return eff
}

function getCherenkovRadiationEff(display=false) {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	let rads = player.dilation.br.cherenkovRadiation
	let div = getBDUpgEff(7).times(getBDUpgEff(8)).times(getBDUpgEff(9)).times(getBDUpgEff(14))
	rads = rads.div(div)
	let exp = 100
	if (hasNU(22)) exp /= 5
	exp /= getBDUpgEff(17)
	if (isBigRipUpgradeActive(24) && tmp.qu.bigRip.active) exp = 0
	let eff = rads.plus(1).pow(exp)
	if (isBigRipUpgradeActive(24) && tmp.qu.bigRip.active) eff = new Decimal(1)
	if (display) return {eff: eff, exp: exp, div: div}
	return eff
}

function getBDUpgCost(u) {
	let costs = [1e6,500,2e3,5e3,1e4,5e4,1e5,1e6,3e6,1e7,1e9,1e10,1e11,2e11,1e13,1e14,1e20,75e19,1e22]
	let cost = new Decimal(costs[u])
	if (u==0) {
		let base = 10
		cost = cost.times(Decimal.pow(base,player.dilation.br.rebuyable))
	}
	return cost
}

function hasBDUpg(u) {
	if (player.aarexModifications.ngp5V === undefined) return false
	if (!player.dilation.br['break']) return false
	if ((u==0&&player.dilation.br.rebuyable>0) || player.dilation.br.upgrades.includes(u)) return true
	return false
}

function getBDUpgDesc(u) {
	let eff = getBDUpgEff(u)
	let d = [3,'d','d','d','d','d','d','d','d','d',0,'d','d','d','d','d',0,2,'d']
	let desc = (d[u]=='d') ? shorten(eff) : getFullExpansion(Math.floor(eff*Math.pow(10,d[u]))/Math.pow(10,d[u]))
	return desc
}

function getBDUpgEff(u) {
	let d = ['n','d','d','d','d','d','d','d','d','d','a','d','d','d','d','d','a','n','d']
	let eff = (d[u]=='d') ? new Decimal(1) : (d[u]=='a') ? 0 : 1
	if (!hasBDUpg(u)) return eff
	if (u==0) {
		eff = Math.cbrt(player.dilation.br.rebuyable+1)
		if (eff>=1.2) eff = Math.sqrt(eff)*Math.sqrt(1.2)
		if (eff>=1.5) eff = Math.cbrt(eff)*Math.pow(1.5,2/3)
		if (eff>=1.75) eff = Math.log10(eff)/Math.log10(1.75)*1.75
	}
	let rads = player.dilation.br.cherenkovRadiation
	if (rads.gte(1e10)) rads = rads.pow(0.1).times(1e9)
	if (u==1) eff = rads.plus(1).pow(1.2)
	if (u==2) eff = Decimal.pow(rads.plus(1),0.2)
	if (u==3) eff = Decimal.pow(rads.plus(1),10)
	if (u==4) eff = Decimal.pow(player.dilation.tachyonParticles.plus(1).log10()+1,0.3)
	if (u==5) eff = Decimal.pow(player.ghostify.dimensions.power.plus(1).log2()+1,0.3)
	if (u==6) eff = Decimal.pow(getTotalLights()+1,0.6)
	if (u==7) eff = Decimal.pow(player.dilation.tachyonParticles.plus(1).log10()+1,0.4)
	if (u==8) eff = Decimal.pow(player.ghostify.ghostParticles.plus(1).log10()/10+1,0.4)
	if (u==9) eff = Decimal.pow(player.totalTickGained+1,0.2)
	if (u==10) eff = Decimal.log10(rads.plus(1))*10000
	if (u==11) eff = rads.plus(1).pow(1/3)
	if (u==12) eff = Decimal.pow(rads.plus(1).log10()+1,1.2)
	if (u==13) eff = Decimal.pow(player.dilation.dilatedTime.plus(1).log10()+1,0.9)
	if (u==14) eff = Decimal.pow(player.dilation.dilatedTime.plus(1).log10()+1,0.82)
	if (u==15) eff = Decimal.pow(rads.plus(1).log10()+1,1.25)
	if (u==16) eff = Math.pow(rads.plus(1).pow(0.75).log10(), 0.75) * 1e4
	if (u==17) eff = Math.pow(player.ghostify.ghostParticles.plus(1).log10()+1, 0.2)
	if (u==18) eff = rads.plus(1).pow(0.75)
	return eff
}

function buyBreakDilationUpg(u,max=false) {
	if (player.dilation.br.cherenkovRadiation.lt(getBDUpgCost(u))) return
	if (player.dilation.br.upgrades.includes(u)) return
	if (u>0) {
		player.dilation.br.cherenkovRadiation = player.dilation.br.cherenkovRadiation.minus(getBDUpgCost(u))
		player.dilation.br.upgrades.push(u)
	} else {
		if (max) {
			let target = Math.floor(Decimal.log10(player.dilation.br.cherenkovRadiation.div(1e6))+1)
			let bulk = target - player.dilation.br.rebuyable
			player.dilation.br.cherenkovRadiation = player.dilation.br.cherenkovRadiation.minus(getBDUpgCost(0).times(Decimal.pow(10,bulk-1)))
			player.dilation.br.rebuyable += bulk
		} else {
			player.dilation.br.cherenkovRadiation = player.dilation.br.cherenkovRadiation.minus(getBDUpgCost(0))
			player.dilation.br.rebuyable += 1
		}
	}
}

function toggleAutoReplBoosts() {
	player.replicantiBoosts.auto = !player.replicantiBoosts.auto
}

function showBaryonsTab(tabName) {
	var tabs = document.getElementsByClassName('baryonstab');
	var tab;
	var oldTab
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.style.display == 'block') oldTab = tab.id
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	closeToolTip()
}

function getNucleonCost(type, change=0) {
	let cost = Decimal.pow(Decimal.pow(2,player.ghostify.baryons.nucleons[type]+change),player.ghostify.baryons.nucleons[type]+change).times(getNucleonCostBase())
	return cost
}

function getNucleonCostBase() {
	let base = new Decimal(1e50)
	base = base.div(getBDUpgEff(18))
	base = base.div(getOtherSuperchargeEffs()[4])
	return base
}

function buyNucleon(type,max=false) {
	if (player.ghostify.darkness.amount.lt(getNucleonCost(type))) return
	let cost = getNucleonCost(type)
	if (max) {
		let target = Math.floor(Math.sqrt(Decimal.log10(player.ghostify.darkness.amount.div(getNucleonCostBase()))/Decimal.log10(2))+1)
		player.ghostify.baryons.nucleons[type] = Math.max(player.ghostify.baryons.nucleons[type],target)
		player.ghostify.darkness.amount = player.ghostify.darkness.amount.minus(getNucleonCost(type, -1))
	} else {
		player.ghostify.baryons.nucleons[type] += 1
		player.ghostify.darkness.amount = player.ghostify.darkness.amount.minus(cost)
	}
}

function sacrificeNucleons() {
	let max = player.ghostify.baryons.nucleons.protons+player.ghostify.baryons.nucleons.neutrons
	if (max<=player.ghostify.baryons.nucleons.sacrificed) return
	player.ghostify.baryons.nucleons.sacrificed = Math.max(player.ghostify.baryons.nucleons.sacrificed,max)
	player.ghostify.baryons.nucleons.protons = 0
	player.ghostify.baryons.nucleons.neutrons = 0
}

function getSacNucEff() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	let base = new Decimal('1e10000')
	if (inGC(0)) base = new Decimal('1e250000')
	let eff = Decimal.pow(base,Math.sqrt(player.ghostify.baryons.nucleons.sacrificed))
	return eff
}

function activateHyperon(type) {
	if (currentAnnihilationTier()>0) return
	startAmount = player.ghostify.baryons.hyperons[type]
	if (getHyperonGain()<1) return
	hyperonsList = ['lambda','sigma','xi','omega']
	for (i=0;i<4;i++) if (player.ghostify.baryons.hyperons[hyperonsList[i]]>0) player.ghostify.baryons.hyperons[hyperonsList[i]] = 0
	if (startAmount==0) player.ghostify.baryons.hyperons[type] = Math.max(player.ghostify.baryons.hyperons[type],getHyperonGain())
	player.ghostify.baryons.nucleons.sacrificed = 0
	ghostifyReset(false,0,0,true)
}

function getHyperonGain(noTarget=false) {
	if (player.aarexModifications.ngp5V === undefined) return 0
	if (!player.ghostify.baryons.hyperons.unl) return 0
	if (player.ghostify.baryons.nucleons.sacrificed<20) return 0
	let gain = Math.floor(Math.sqrt(player.ghostify.baryons.nucleons.sacrificed-19)/1.5+1)
	return Math.max(Math.min(gain, noTarget ? 1/0 : Math.floor(player.ghostify.baryons.hyperons.target)),0)
}

function getHyperonBuff(type,target) {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	if (currentAnnihilationTier()>0) return new Decimal(1)
	let gain = new Decimal(1)
	let intensity = (target!==undefined) ? target : player.ghostify.baryons.hyperons[type]
	intensity += getSuperchargedHyperonsEff() * (!inGC(0) ? 0 : 1)
	if (player.ghostify.baryons.hyperons.supercharge.active) intensity = 0
	if (type=='lambda') {
		gain = Decimal.pow('1e10000',Math.sqrt(intensity))
	}
	if (type=='sigma') {
		gain = Decimal.pow('1e100',Math.sqrt(intensity))
	}
	if (type=='xi') {
		gain = Decimal.pow(10,Math.sqrt(intensity))
	}
	if (type=='omega') {
		gain = Decimal.pow(4,Math.sqrt(intensity))
	}
	return gain
}

function getHyperonNerf(type,target) {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	if (currentAnnihilationTier()>0) return new Decimal(1)
	let nerf = new Decimal(1)
	let intensity = (target!==undefined) ? target : player.ghostify.baryons.hyperons[type]
	intensity /= getAntiBaryonEff("antihyperons")
	if (player.ghostify.baryons.hyperons.supercharge.active) intensity = intensity * 2 + 1
	if (type=='lambda') {
		nerf = Decimal.pow('1e1000000',Math.sqrt(intensity))
	}
	if (type=='sigma') {
		nerf = Decimal.pow('1e1000',Math.sqrt(intensity))
	}
	if (type=='xi') {
		nerf = Decimal.pow(1e10,Math.sqrt(intensity))
	}
	if (type=='omega') {
		nerf = Decimal.pow(2,Math.sqrt(intensity))
	}
	return nerf
}

function changeHyperonTarget() {
	let value = Math.floor(JSON.parse(document.getElementById("hyperonTarget").value))
	player.ghostify.baryons.hyperons.target = Math.max(value, 0)
	document.getElementById("hyperonTarget").textContent = getFullExpansion(player.ghostify.baryons.hyperons.target)
}

function superchargeHyperons() {
	if (currentAnnihilationTier()>0) return
	let hyperons = getSuperchargingHyperons()
	if (hyperons<1) return
	ghostifyReset(false,0,0,true)
	player.ghostify.baryons.hyperons.supercharge.active = !player.ghostify.baryons.hyperons.supercharge.active
}

function getSuperchargingHyperons() {
	let hyperons = 0
	hyperonsList = ['lambda','sigma','xi','omega']
	for (h=0;h<4;h++) {
		if (player.ghostify.baryons.hyperons[hyperonsList[h]]>hyperons) hyperons = player.ghostify.baryons.hyperons[hyperonsList[h]]
	}
	return hyperons
}

function getSuperchargedHyperonsEff() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	let eff = Math.sqrt(player.ghostify.baryons.hyperons.supercharge.hyperons)
	return eff
}

function getOtherSuperchargeEffs(display=false) {
	if (display) {
		if (player.aarexModifications.ngp5V === undefined) return ""
		let hyperons = player.ghostify.baryons.hyperons.supercharge.hyperons
		let html = "<ul>"
		if (hyperons >= 1) html += "<li>They make Darkness increase the galaxies translated to the Intergalactic multiplier while Big Ripped by "+getFullExpansion(getOtherSuperchargeEffs()[1])+".</li>"
		if (hyperons >= 2) html += "<li>They make Sacrificed Nucleons boost the final 3 Neutrino boosts by "+getFullExpansion(Math.round(getOtherSuperchargeEffs()[2]*1e4)/100)+"%.</li>"
		if (hyperons >= 3) html += "<li>They make Space Shards and GHP boost Darkness gain by "+shorten(getOtherSuperchargeEffs()[3])+"x.</li>"
		if (hyperons >= 4) html += "<li>They make Eternal Matter and Light Empowerments reduce Nucleon cost by "+shorten(getOtherSuperchargeEffs()[4])+"x.</li>"
		if (hyperons >= 5) html += "<li>While outside Annihilation runs, they make Exotic Matter boost Darkness gain by "+shorten(getOtherSuperchargeEffs()[5])+"x.</li>"
		html += "</ul>"
		return html
	} else {
		if (player.aarexModifications.ngp5V === undefined) return {1: 0, 2: 0, 3: 1, 4: 1, 5: 1}
		let hyperons = player.ghostify.baryons.hyperons.supercharge.hyperons
		let pow1 = 0
		if (hyperons >= 1) {
			pow1 += player.ghostify.darkness.amount.plus(1).log10()*375*hyperons
			if (pow1>=1e5) pow1 = Math.sqrt(pow1)*Math.sqrt(1e5)
			if (pow1>=1e6) pow1 = Math.log10(pow1)*1e6/6
			pow1 = Math.floor(pow1)
		}
		let pow2 = 0
		if (hyperons >= 2) {
			pow2 = Math.sqrt(player.ghostify.baryons.nucleons.sacrificed/20)*2
			pow2 += hyperons - 2
			if (pow2>=2) pow2 = Math.log2(pow2)*2
		}
		let pow3 = 1
		if (hyperons >= 3) {
			let pow3exp = Math.pow(hyperons, 1.2)*1.25+0.75
			pow3 = Decimal.pow(tmp.qu.bigRip.spaceShards.times(player.ghostify.ghostParticles.max(Decimal.pow(10,10000)).div(Decimal.pow(10,10000))).plus(1).log10()+1, pow3exp).times(Decimal.pow(2, hyperons - 3))
		}
		let pow4 = 1
		if (hyperons >= 4) {
			let pow4exp = (hyperons-3)/40*Math.pow(player.ghostify.ghostlyPhotons.enpowerments+1, 0.1)
			pow4 = tmp.qu.breakEternity.eternalMatter.plus(1).pow(pow4exp)
		}
		let pow5 = 1
		if (hyperons >= 5) {
			let pow5exp = Math.sqrt(hyperons-4)+(Math.pow(Math.log2(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1)+1, 0.44)-1)
			pow5 = Decimal.pow(10, hyperons-5).times(1e15).pow(pow5exp)
		}
		return {1: pow1, 2: pow2, 3: pow3, 4: pow4, 5: pow5}
	}
}

// New Achievements

function updateNGP5VAchs() {
	if (player.ghostify.ghostlyPhotons.enpowerments > 2 && !player.achievements.includes("ng5p11")) giveAchievement("Those ghosts are cold.")
	if (player.quantum.nanofield.rewards >= 128 && !player.achievements.includes("ng5p12")) giveAchievement("Gigafield")
	if (player.quantum.pairedChallenges.completions[68] && !player.achievements.includes("ng5p13")) giveAchievement("Big Rip wasn't enough.")
	if (player.ghostify.darkness.amount.gte(1e12) && !player.achievements.includes("ng5p14")) giveAchievement("I can't see!")
	if (player.ghostify.darkness.upgrades[2][2] === true && !player.achievements.includes("ng5p15")) giveAchievement("Truly Underchallenged")
	if (player.ghostify.challenges.tiers[2] > 1 && !player.achievements.includes("ng5p16")) giveAchievement("Overchallenged")
	let noTree = false
    for (var u=1;u<9;u++) {
		if (tmp.qu.tod.upgrades[u]) break
		else noTree = true
    }
	let noBranch = false
	if (Object.keys(tmp.qu.tod.r.upgrades).length+Object.keys(tmp.qu.tod.g.upgrades).length+Object.keys(tmp.qu.tod.b.upgrades).length<=3 && tmp.qu.tod.r.upgrades[1]+tmp.qu.tod.g.upgrades[1]+tmp.qu.tod.b.upgrades[1]<=15) noBranch = true
	if (Math.min(Math.min(getRadioactiveDecays("r"),getRadioactiveDecays("g")),getRadioactiveDecays("b"))>1&&tmp.qu.tod.r.quarks.min(tmp.qu.tod.g.quarks).min(tmp.qu.tod.b.quarks).gte("1e1000000000000")&&noTree&&!tmp.qu.bigRip.times && !player.achievements.includes("ng5p17")) giveAchievement("Strong Decay")
	// ng5p18: In game.js (approx line 7583)
	if (player.ghostify.endlessMirrors.amount > 0 && !player.achievements.includes("ng5p21")) giveAchievement("Meta-Dimension Boost Boosts")
	if (player.ghostify.ghostlyPhotons.enpowerments >= 13 && !player.achievements.includes("ng5p22")) giveAchievement("So bright!")
	if (noBranch && tmp.qu.tod.r.spin.min(tmp.qu.tod.g.spin.min(tmp.qu.tod.b.spin)).gte(1e72) && !player.achievements.includes("ng5p23")) giveAchievement("The Tree is dead")
	if (getFreeElectrons()>=2e6 && !player.achievements.includes("ng5p24")) giveAchievement("Anti-Darkness")
	if (player.ghostify.endlessMirrors.amount>=25 && !player.achievements.includes("ng5p25")) giveAchievement("Spooky to the Max!")
	if (player.ghostify.challenges.tiers[0] > 1 && !player.achievements.includes("ng5p26")) giveAchievement("The Challenge is real.")
	if (player.meta.resets <= 4 && player.meta['2'].amount.eq(0) && player.meta.antimatter.gte(Decimal.pow(10,17500)) && !player.achievements.includes("ng5p27")) giveAchievement("The truth will be uncovered!")
	// ng5p28: In game.js (approx line 7583)
	if (player.dilation.br['break'] && !player.achievements.includes("ng5p31")) giveAchievement("Why Dilate?")
	if (!player.dilation.br['break'] && player.dilation.tachyonParticles.gte(Decimal.pow(10,825)) && !player.achievements.includes("ng5p32")) giveAchievement("The fake Anti-Dilation modifier.")
	// ng5p33: In ngppp.js (in ghostifyReset(), approx line 3285)
	if (player.dilation.br.upgrades.includes(15) && !player.achievements.includes("ng5p34")) giveAchievement("The spookiest particle.")
	if (player.ghostify.baryons.hyperons.unl && !player.achievements.includes('ng5p35')) giveAchievement("The spookiest of the spookiest.")
	if (player.ghostify.dimensions.spirits>=3 && !player.achievements.includes("ng5p36")) giveAchievement("Betcha didn't know these existed!")
	if (player.replicantiBoosts.amount>=3 && !player.achievements.includes("ng5p37")) giveAchievement("Replication Galore!")
	// ng5p38: In game.js (approx line 7583)
	if (player.ghostify.annihilation.active && !player.achievements.includes("ng5p41")) giveAchievement("Ghostify wasn't enough either.")
	if (player.ghostify.dimensions.power.gte(Decimal.pow(Number.MAX_VALUE, 1.45)) && player.ghostify.challenges.tiers[2]>=14 && !player.achievements.includes("ng5p42")) giveAchievement("Ghostly Quantum")
	// ng5p43: In ngpp.js (in quantum())
	if (player.ghostify.annihilation.exoticMatter.gte(999.99e9) && !player.achievements.includes("ng5p44")) giveAchievement("This Achievement doesn't exist 5")
	if (player.ghostify.challenges.tiers[0]>=6 && !player.achievements.includes("ng5p45")) giveAchievement("Exhaustion on the maximum level.")
	if (player.ghostify.annihilation.maxTier > 1 && !player.achievements.includes("ng5p46")) giveAchievement("Level Up!")
	if (player.ghostify.annihilation.exoticMatter.gte(5e14) && !player.achievements.includes("ng5p47")) giveAchievement("So Close!")
	// ng5p48: In game.js (approx line 7583)
}

function setNGP5VAchTooltips() {
	document.getElementById("I can't see!").setAttribute("ach-tooltip", "Reach " +shortenCosts(1e12) +" Darkness. Reward: Darkness gain is 10x faster while under " +shortenCosts(1e12) +" Darkness.")
	document.getElementById("Strong Decay").setAttribute("ach-tooltip", "Get "+shortenCosts(Decimal.pow(10, 1e12))+" Infinity Unstable Quarks for each Branch without any Tree Upgrades and without Big Ripping.")
	document.getElementById("Darkness encompasses us all.").setAttribute("ach-tooltip", "Reach "+shortenCosts(Decimal.pow(10,157e5))+" IP while dilated and big ripped and without having studies, EP mult upgrades, First Meta Dimensions, Meta Dimension Boosts (4 maximum), Tree Upgrades, and Break Eternity.")
	document.getElementById("The Tree is dead").setAttribute("ach-tooltip", "Reach "+shortenCosts(1e72)+" Quark Spin for each branch without any Branch Upgrades or Radioactive Decays.")
	document.getElementById("The truth will be uncovered!").setAttribute("ach-tooltip", "Reach "+shortenCosts(Decimal.pow(10,17500))+" Meta-Antimatter without any Meta-Dimension Boosts (maximum 4) or Second Meta-Dimensions.")
	document.getElementById("The Spirits haunt you forever.").setAttribute("ach-tooltip", "Reach "+shortenCosts(Decimal.pow(10, 3375e4))+" IP while dilated and big ripped and without having studies, Eternity Points, First Meta Dimensions, Meta Dimension Boosts (4 maximum), Tree Upgrades, and Break Eternity.")
	document.getElementById("The fake Anti-Dilation modifier.").setAttribute("ach-tooltip", "Reach "+shortenCosts(Decimal.pow(10,825))+" TP without Breaking Dilation.")
	document.getElementById("Underchallenged II").setAttribute("ach-tooltip", "Become a ghost with "+shortenCosts(Decimal.pow(10,625e4))+" EP without any TP or starting Eternity Challenge 10 while Big Ripped.")
	document.getElementById("The pain haunts you forever.").setAttribute("ach-tooltip", "Reach "+shortenCosts(Decimal.pow(10, 98e7))+" IP while dilated and big ripped and without having studies, Eternity Points, First Meta Dimensions, Meta Dimension Boosts (4 maximum), Tree Upgrades, Break Eternity,  Tachyon Particles, and Active Hyperons.")
	document.getElementById("Ghostly Quantum").setAttribute("ach-tooltip", "Reach " +shorten(Decimal.pow(Number.MAX_VALUE, 1.45)) +" Ghost Power and reach Tier 14 of Ghostly Challenge 3.")
	document.getElementById("This Achievement doesn't exist 5").setAttribute("ach-tooltip", "Reach " +shorten(999.99e9) +" Exotic Matter.")
	document.getElementById("So Close!").setAttribute("ach-tooltip", "Reach " +shorten(5e14) +" Exotic Matter.")
	document.getElementById("Death on another plane of existence").setAttribute("ach-tooltip", "Reach "+shortenDimensions(Decimal.pow(10, 26.1e6))+" IP while dilated, big ripped, and while your timeline is Annihilated.")
}

// Scaling Data

function updateScaleData() {
	document.getElementById('dbdss').textContent = getFullExpansion(Math.floor(getSupersonicStart()))
	document.getElementById('dbdsp').textContent = getFullExpansion(Math.round(getSupersonicMultIncrease()*2500)/100)
	document.getElementById('dbdhd').style.display = (player.resets >= getHypersonicStart()) ? "" : "none"
	document.getElementById('dbdhs').textContent = getFullExpansion(Math.floor(getHypersonicStart()))
	document.getElementById('dbdhp').textContent = getFullExpansion(Math.round(getHypersonicMultIncrease())/100)
	document.getElementById("gdds").textContent = getFullExpansion(Math.floor(getGalaxyCostScalingStart(player.galaxies, (player.galaxies >= 302500 / (tmp.be ? 55 : 1) ? Math.pow(2, (player.galaxies + 1 - (302500 / (tmp.be ? 55 : 1) + getGhostlyGalaxyPush(tmp.be))) * (tmp.be ? 55 : 1) / 1e4 / (player.ghostify.ghostlyPhotons.enpowerments>2&&tmp.be?tmp.le[8]&&!inGC(3):1)) : 1))))
	document.getElementById('gddp').textContent = getFullExpansion(Math.round((getDistantGalaxyScalingSpeed())*10000)/100)
	document.getElementById('gdrd').style.display = (player.galaxies >= getRemoteGalaxyScalingStart(player.galaxies) || quantumed || ghostified) ? "" : "none"
	document.getElementById('gdrs').textContent = getFullExpansion(Math.floor(getRemoteGalaxyScalingStart(player.galaxies)))
	document.getElementById('gdrp').textContent = getFullExpansion(Math.round(getRemoteGalaxyScalingPower()*((!tmp.be && !hasNU(6) || inGC(4)) ? 1 : 0)*10000)/100)
	document.getElementById('gddmd').style.display = (player.galaxies > 1399 || quantumed || ghostified) ? "" : "none"
	document.getElementById('gddmp').textContent = getFullExpansion(Math.round((1/getDarkMatterGalaxyPush())*10000)/100)
	document.getElementById('gdgd').style.display = (player.galaxies >= 302500 / (tmp.be ? 55 : 1) || quantumed || ghostified) ? "" : "none"
	document.getElementById('gdgs').textContent = getFullExpansion(Math.floor(302500/(tmp.be ? 55 : 1) + getGhostlyGalaxyPush(tmp.be)))
	document.getElementById('gdgp').textContent = getFullExpansion(Math.round((inGC(3) ? 1 : (tmp.be?2-tmp.le[8]:1))*10000)/100)
	document.getElementById("gdsd").style.display = (player.galaxies >= getSpookyGalaxyData().start) ? "" : "none"
	document.getElementById("gdss").textContent = getFullExpansion(Math.floor(getSpookyGalaxyData().start))
	document.getElementById("gdsp").textContent = getFullExpansion(Math.round(getSpookyGalaxyData().power*1e4)/100)
}

// Annihilation Stuff

function getExoticMatterGain() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(0)
	let gain = Decimal.pow(player.money.plus(1).log10(), 0.9).times(Decimal.pow(1e6, Math.pow(player.ghostify.annihilation.tier-1, 0.7))).div(5e12)
	if (hasAnnihilationUpg(7)) gain = gain.times(getAnnihilationUpgEff(7))
	if (hasAnnihilationUpg(9)) gain = gain.times(getAnnihilationUpgEff(9))
	if (hasAnnihilationUpg(18)) gain = gain.times(getAnnihilationUpgEff(18))
	if (hasAnnihilationUpg(29)) gain = gain.times(getAnnihilationUpgEff(29))
	if (hasAnnihilationUpg(33)) gain = gain.times(getAnnihilationUpgEff(33))
	gain = gain.times(getCascadePowerEff4())
	return Decimal.round(gain)
}

function getExoticMatterEff() {
	if (player.aarexModifications.ngp5V === undefined) return 1
	let eff = Math.pow(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1, 0.167)
	return eff
}

function changeAnnihilationTier(change) {
	if (currentAnnihilationTier()>0) return
	player.ghostify.annihilation.tier += change
	if (player.ghostify.annihilation.tier<1) player.ghostify.annihilation.tier = 1
	if (player.ghostify.annihilation.tier>player.ghostify.annihilation.maxTier) player.ghostify.annihilation.tier = player.ghostify.annihilation.maxTier
}

function currentAnnihilationTier() {
	if (player.aarexModifications.ngp5V === undefined) return 0
	if (!player.ghostify.annihilation.active) return 0
	return player.ghostify.annihilation.tier
}

function annihilate(force=false) {
	if (player.aarexModifications.ngp5V === undefined) return
	if (player.ghostify.annihilation.active && !force) player.ghostify.annihilation.exoticMatter = player.ghostify.annihilation.exoticMatter.plus(getExoticMatterGain())
	// Bug Fixes
	if (!player.ghostify.annihilation.active) respecTimeStudies(true)
	player.ghostify.baryons.hyperons.supercharge.active = false
	player.ghostify.challenges.active = 0
	if (player.ghostify.annihilation.active) speedrunMilestonesReached=27
	// Toggle Annihilation
	player.ghostify.annihilation.active = !player.ghostify.annihilation.active
	let resetStuff = true
	if (!player.ghostify.annihilation.active) {
		resetStuff = false
		updateAnnihilationStorage()
	}
	// Set Storage
	if (resetStuff) {
		player.ghostify.annihilation.storage = {
			lE: player.ghostify.ghostlyPhotons.enpowerments,
			brBreak: player.dilation.br['break'],
			timestudies: player.timestudy.studies,
			dilstudies: player.dilation.studies,
			masterystudies: player.masterystudies,
			neutrinoUpgs: player.ghostify.neutrinos.upgrades,
			darkness: player.ghostify.darkness.amount,
			eMr: player.ghostify.endlessMirrors.refraction.rebuyable,
			dilUpgs: player.dilation.upgrades,
			nb: player.ghostify.neutrinos.boosts,
			bru: player.quantum.bigRip.upgrades,
			gUpgs: player.quantum.upgrades,
			eM: player.ghostify.endlessMirrors.amount,
			brEb: player.quantum.breakEternity['break'],
			brEu: player.quantum.breakEternity.upgrades,
		}
	}
	// Ghostify Reset
	ghostifyReset(false,0,0,true,player.ghostify.annihilation.active)
	if (resetStuff) {
		// Light Empowerment reset
		player.ghostify.ghostlyPhotons.amount=new Decimal(0)
		player.ghostify.ghostlyPhotons.darkMatter=new Decimal(0)
		player.ghostify.ghostlyPhotons.ghostlyRays=new Decimal(0)
		player.ghostify.ghostlyPhotons.lights=[0,0,0,0,0,0,0,0]
		player.ghostify.ghostlyPhotons.enpowerments=0
		// Fix Dilation reset
		player.dilation.br.cherenkovRadiation = new Decimal(0)
		player.dilation.tachyonParticles = new Decimal(0)
		player.dilation.bestTP = new Decimal(0)
		if (!hasAnnihilationUpg(24)) player.dilation.br['break'] = false
		// Reset Studies
		player.timestudy.studies = []
		player.dilation.studies = [1,6]
		player.masterystudies = ["d7","d8","d9","d14"]
		// Reset Neutrinos
		player.ghostify.neutrinos = {
			electron: new Decimal(0),
			mu: new Decimal(0),
			tau: new Decimal(0),
			generationGain: 1,
			multPower: player.ghostify.neutrinos.multPower,
			upgrades: hasAnnihilationUpg(5) ? player.ghostify.neutrinos.upgrades : [],
			boosts: hasAnnihilationUpg(4) ? player.ghostify.neutrinos.boosts : 1,
		}
		// Reset Darkness amount
		player.ghostify.darkness.amount = new Decimal(0)
		// Reset Endless Mirrors
		if (!hasAnnihilationUpg(17)) {
			player.ghostify.endlessMirrors = {
				amount: 0,
				lightEnergy: new Decimal(0),
				refraction: {
					energy: new Decimal(0),
					light: new Decimal(0),
					rebuyable: 0,
				},
			}
		}
		// Reset Ghost Dimensions
		player.ghostify.dimensions = {
			amount: [null,player.ghostify.dimensions.bought[1],player.ghostify.dimensions.bought[2],player.ghostify.dimensions.bought[3],player.ghostify.dimensions.bought[4],player.ghostify.dimensions.bought[5],player.ghostify.dimensions.bought[6],player.ghostify.dimensions.bought[7],player.ghostify.dimensions.bought[8]],
			bought: player.ghostify.dimensions.bought,
			power: new Decimal(0),
			spirits: player.ghostify.dimensions.spirits,
		}
		for (i=1;i<=8;i++) player.ghostify.dimensions.amount[i] = new Decimal(player.ghostify.dimensions.amount[i])
		if (hasAnnihilationUpg(14)) {
			for (i=1;i<=8;i++) tmp.qu.challenges[i] = 1
			tmp.qu.electrons.mult+=0.25*8
		}
	}
	// Update Stuff
	updateOnAnnihilation()
	// Update Tabs
	if (currentAnnihilationTier()>0) {
		if (document.getElementById("emperordimensions").style.display != "none") showDimTab('antimatterdimensions')
		showEternityTab("timestudies", true)
		showQuantumTab("uquarks")
		showGhostifyTab("annihilation")
	}
}

function updateAnnihilationStorage() {
	let hasAU14 = false
	player.ghostify.ghostlyPhotons.enpowerments = player.ghostify.annihilation.storage.lE
		player.dilation.br['break'] = player.ghostify.annihilation.storage.brBreak
		player.timestudy.studies = player.ghostify.annihilation.storage.timestudies
		player.dilation.studies = player.ghostify.annihilation.storage.dilstudies
		player.masterystudies = player.ghostify.annihilation.storage.masterystudies
		player.ghostify.neutrinos.upgrades = player.ghostify.annihilation.storage.neutrinoUpgs
		player.ghostify.darkness.amount = new Decimal(player.ghostify.annihilation.storage.darkness)
		player.ghostify.endlessMirrors.refraction.rebuyable = player.ghostify.annihilation.storage.eMr
		player.dilation.upgrades = player.ghostify.annihilation.storage.dilUpgs
		player.ghostify.neutrinos.boosts = player.ghostify.annihilation.storage.nb
		player.quantum.bigRip.upgrades = player.ghostify.annihilation.storage.bru
		player.quantum.upgrades = player.ghostify.annihilation.storage.gUpgs
		player.ghostify.endlessMirrors.amount = player.ghostify.annihilation.storage.eM
		player.quantum.breakEternity['break'] = player.ghostify.annihilation.storage.brEb
		player.quantum.breakEternity.upgrades = player.ghostify.annihilation.storage.brEu
		player.ghostify.annihilation.innerStorage = {
			qcs: hasAU14 && player.ghostify.annihilation.innerStorage.mT>=player.ghostify.annihilation.tier ? tmp.qu.challenges : {},
			pcs: {
				order: hasAU14 && player.ghostify.annihilation.innerStorage.mT>=player.ghostify.annihilation.tier ? tmp.qu.pairedChallenges.order : {},
				completed: hasAU14 && player.ghostify.annihilation.innerStorage.mT>=player.ghostify.annihilation.tier ? tmp.qu.pairedChallenges.completed : 0,
			},
			mT: Math.max(player.ghostify.annihilation.innerStorage.mT, player.ghostify.annihilation.tier),
		}
}

function updateOnAnnihilation() {
	tmp.qu=player.quantum
	updatePowers()
	hideDimensions()
	updateTickSpeed()
	document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	document.getElementById("infmultbuyer").textContent="Max buy IP mult"
	updateChallenges()
	updateNCVisuals()
	updateAutobuyers()
	hideMaxIDButton()
	updateLastTenRuns()
	player.eternityChallUnlocked=0
	player.dilation.bestTP = player.dilation.tachyonParticles
	player.dilation.totalTachyonParticles = player.dilation.tachyonParticles
	document.getElementById("eternitybtn").style.display = "none"
	document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: 1x<p>Cost: 500 EP"
	updateLastTenEternities()
	resetTimeDimensions()
	updateRespecButtons()
	updateMilestones()
	updateEternityUpgrades()
	document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
	updateTheoremButtons()
	updateTimeStudyButtons(true)
	updateEternityChallenges()
	updateDilationUpgradeCosts()
	updateMasteryStudyCosts()
	updateMasteryStudyButtons()
	document.getElementById('bestTP').textContent="Your best Tachyon particles in this Ghostify was "+shorten(player.dilation.bestTP)+"."
	updateLastTenQuantums()
	updateSpeedruns()
	updateQuantumTabs()
	updateColorCharge()
	updateGluons("prestige")
	updateQuantumWorth("quick")
	updateBankedEter()
	updateQuantumChallenges()
	updatePCCompletions()
	updateReplicants("prestige")
	updateEmperorDimensions()
	updateTODStuff()
	updateBreakEternity()
	updateGhostifyTabs()
	updateLastTenGhostifies()
	updateNeutrinoBoosts()
	document.getElementById("neutrinoMult").textContent=shortenDimensions(getNeutrinoMultPower())
	updateBraveMilestones()
	for (i=1;i<=4;i++) updateGC(i)
	performedTS = false
	document.getElementById("edtabbtn").style.display=!player.masterystudies?"none":player.masterystudies.includes("d11")?"":"none"
	document.getElementById("nanofieldtabbtn").style.display=player.masterystudies.includes("d12")?"":"none"
	document.getElementById("eggonsCell").style.display = player.ghostify.neutrinos.upgrades.includes(2) ? "none" : ""
    document.getElementById("workerReplWhat").textContent = player.ghostify.neutrinos.upgrades.includes(2) ? "babies" : "eggons"
}

var annihilationUpgCosts = [new Decimal(40),new Decimal(75),new Decimal(140),new Decimal(225),new Decimal(400),new Decimal(600),new Decimal(825),new Decimal(1e3),new Decimal(12e2),new Decimal(5e3),new Decimal(72e2),new Decimal(98e2),new Decimal(125e2),new Decimal(19e3),new Decimal(32e3),new Decimal(4e4),new Decimal(5e4),new Decimal(1e5),new Decimal(18e4),new Decimal(225e3),new Decimal(295e3),new Decimal(32e4),new Decimal(4e5),new Decimal(5e5),new Decimal(75e4),new Decimal(1e6),new Decimal(75e4),new Decimal(4e5),new Decimal(5e5),new Decimal(1e6),new Decimal(8e5),new Decimal(1.1e6),new Decimal(1.5e6),new Decimal(1e12),new Decimal(1e12),new Decimal(2.5e13)]

function updateAnnihilationUpgs() {
	for (i=1;i<=annihilationUpgCosts.length;i++) {
		let id = "annihilationUpg"+i
		document.getElementById(id).className = (player.ghostify.annihilation.upgrades.includes(i)) ? "gluonupgradebought annihilate" : (player.ghostify.annihilation.exoticMatter.gte(getAnnihilationUpgCost(i))) ? "gluonupgrade annihilate" : "gluonupgrade unavailablebtn"
		document.getElementById(id+"Cost").textContent = shortenDimensions(getAnnihilationUpgCost(i))
		if (document.getElementById(id+"Current") !== null) document.getElementById(id+"Current").textContent = i==19||i==22||i==32 ? getFullExpansion(Math.round(getAnnihilationUpgEff(i))) : shorten(getAnnihilationUpgEff(i))
	}
	document.getElementById("resetAnnihilationUpgs").className = player.ghostify.annihilation.upgrades.length>0 ? "gluonupgrade annihilate" : "gluonupgrade unavailablebtn"
	let id = "annihilationRebuyable"
	document.getElementById(id).className = (player.eternityPoints.gte(getAnnihilationRebuyableCost()) && currentAnnihilationTier()>0) ? "gluonupgrade annihilate" : "gluonupgrade unavailablebtn"
	document.getElementById(id+"Cost").textContent = shorten(getAnnihilationRebuyableCost())
	document.getElementById(id+"Current").textContent = getFullExpansion(Math.round(getAnnihilationRebuyableEff()*1e3)/10)
}

function getAnnihilationUpgCost(n) {
	return annihilationUpgCosts[n-1]
}

function getAnnihilationUpgEff(n) {
	let dec = !(n==19||n==22||n==32)
	let zeroStart = n==19||n==22||n==23||n==32
	let start = dec ? new Decimal(zeroStart?0:1) : (zeroStart?0:1)
	if (player.aarexModifications.ngp5V === undefined) return start
	if (!(n==22||n==23)) {
		if (!hasAnnihilationUpg(n)) return start
	} else {
		if (!player.ghostify.annihilation.upgrades.includes(n)) return start
		if (currentAnnihilationTier()>0) return start
	}
	let eff = start
	if (n==2) eff = Decimal.pow(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1,1.25)
	if (n==5) {
		eff = Decimal.pow(2, tmp.qu.electrons.amount/1e3)
		if (eff.gte(1e20)) eff = Decimal.sqrt(eff).times(Decimal.sqrt(1e20))
		if (eff.gte(1e50)) eff = Decimal.cbrt(eff).times(Decimal.pow(1e50, 2/3))
		if (eff.gte(1e100)) eff = Decimal.mul(eff.log10(),1e98)
	}
	if (n==6) {
		eff = Decimal.pow(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1,65.6)
		if (eff.gte(1e50)) eff = Decimal.mul(eff.log10(),1e50/50)
	}
	if (n==7) {
		eff = Decimal.pow(player.meta.bestOverQuantums.plus(1).log10()+1, 0.44)
	}
	if (n==9) {
		eff = Decimal.pow(player.ghostify.ghostlyPhotons.ghostlyRays.plus(1).log10()+1, 2)
	}
	if (n==10) {
		eff = Decimal.pow(2,player.ghostify.endlessMirrors.amount+1).pow(hasAnnihilationUpg(17)?0.4:1)
	}
	if (n==13) {
		eff = Math.pow(Math.log10(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1)+1, 5.01)
		if (eff>=25) eff = Math.sqrt(eff)*5
		if (eff>=100) eff = Math.log10(eff)*50
		if (eff>=200) eff = Math.log10(eff)*(200/Math.log10(200))
		if (eff>=350) eff = Math.log10(eff)*(350/Math.log10(350))
		if (eff>500) eff = 500
	}
	if (n==18) {
		let amount = player.replicanti.amount
		eff = new Decimal(amount.log10()).pow(1/7)
	}
	if (n==19) {
		eff = Math.log10(colorBoosts.g+1)*2
	}
	if (n==22) {
		eff = Math.log2(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1)*4
		if (eff>=20) eff = eff/2+10
		if (eff>=30) eff = eff/3+20
		if (eff>=40) eff = eff/1000+(999*0.04)
		if (eff>=45) eff = eff/1000+(999*0.045)
		if (eff>=48) eff = Math.log10(48)+(48-Math.log10(48))
		if (eff>=50) eff = 50
	}
	if (n==23) {
		eff = Math.log2(player.ghostify.annihilation.exoticMatter.plus(1).log10()+1)*0.1
		if (eff>=0.05) eff = eff/1.5+1/60
		if (eff>=0.1) eff = eff/2+0.05
		if (eff>=0.15) eff = eff/3+0.1
		if (eff>=0.2) eff = eff/5+0.16
		if (eff>=0.25) eff = eff/10+0.225
		if (eff>=0.3) eff = eff/1000+0.2997
		if (eff>0.32) eff = 0.32
	}
	if (n==29) {
		eff = Decimal.sqrt(tmp.qu.bigRip.spaceShards.add(1).log10()+1)
	}
	if (n==32) {
		eff = Math.pow(tmp.qu.breakEternity.eternalMatter.add(1).log10()+1, 2)*15
	}
	if (n==33) {
		eff = tmp.qu.breakEternity.eternalMatter.add(1).pow(0.03)
	}
	return (n==19||n==22||n==32?eff:new Decimal(eff))
}

function buyAnnihilationUpg(n) {
	if (player.ghostify.annihilation.upgrades.includes(n)) return
	if (player.ghostify.annihilation.exoticMatter.lt(getAnnihilationUpgCost(n))) return
	player.ghostify.annihilation.exoticMatter = player.ghostify.annihilation.exoticMatter.minus(getAnnihilationUpgCost(n))
	player.ghostify.annihilation.upgrades.push(n)
	if (n==25||n==27 && tmp.qu.nanofield['toggles']===undefined) tmp.qu.nanofield['toggles'] = []
}

function hasAnnihilationUpg(n) {
	if (player.aarexModifications.ngp5V === undefined) return false
	if (player.ghostify.annihilation !== undefined) return player.ghostify.annihilation.upgrades.includes(n) && player.ghostify.annihilation.active
	else return false
}

function respecAnnihilationUpgs() {
	if (player.ghostify.annihilation.upgrades.length==0) return
	let eMg = new Decimal(0)
	for (i=1;i<=player.ghostify.annihilation.upgrades.length;i++) eMg = eMg.plus(annihilationUpgCosts[player.ghostify.annihilation.upgrades[i-1]-1])
	player.ghostify.annihilation.exoticMatter = player.ghostify.annihilation.exoticMatter.plus(eMg)
	player.ghostify.annihilation.upgrades = []
	if (player.ghostify.annihilation.active) annihilate(true)
	else ghostifyReset(false,0,0,true)
	if (tmp.qu.nanofield['toggles'] !== undefined) tmp.qu.nanofield['toggles'] = undefined
}

function getAnnihilationRebuyableCost() {
	let n = player.ghostify.annihilation.rebuyable
	return Decimal.pow(Decimal.pow(2, n), n*1e10).times(Decimal.pow(10, 1e10))
}

function getAnnihilationRebuyableEff() {
	if (player.aarexModifications.ngp5V === undefined) return 0
	if (currentAnnihilationTier()==0) return 0
	let n = player.ghostify.annihilation.rebuyable
	return Math.pow(Math.log10(n+1)+1, 0.167)-1
}

function buyAnnihilationRebuyable() {
	if (currentAnnihilationTier()==0) return 
	if (player.eternityPoints.lt(getAnnihilationRebuyableCost())) return
	player.eternityPoints = player.eternityPoints.minus(getAnnihilationRebuyableCost())
	player.ghostify.annihilation.rebuyable += 1
}

function buyMaxAnnihilationUpgs() {
	for (i=1;i<=annihilationUpgCosts.length;i++) buyAnnihilationUpg(i)
}

// Annihilation Progress Bar

function doAnnihilationProgress() {
	if (player.aarexModifications.ngp5V === undefined) {
		console.log("Annihilation Progress within a non-NG+5 save")
		doQuantumProgress()
		return 
	}
	var id = 0
	if (currentAnnihilationTier()==0) {
		id = 1
		if (tmp.qu.bigRip.active) id = 2
	} else if (tmp.qu.bigRip.active) id = 4
	else {
		if (getExoticMatterGain().lte(1)) id = 2
		else id = 3
	}
	
	if (id < 3) {
		doQuantumProgress()
		return
	}
	
	var className = "annihilationProgress"
	if (document.getElementById("progressbar").className != className) document.getElementById("progressbar").className = className
	if (id == 3) {
		var gqkLog = getExoticMatterGain().log2()
		var goal = Math.pow(2,Math.ceil(Math.log10(gqkLog) / Math.log10(2)))
		var percentage = Math.min(gqkLog / goal * 100, 100).toFixed(2) + "%"
		document.getElementById("progressbar").style.width = percentage
		document.getElementById("progresspercent").textContent = percentage
		document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to "+shortenDimensions(Decimal.pow(2,goal))+" Exotic Matter gain")
	} else if (id == 4) {
		var percentage = Math.min(tmp.qu.bigRip.bestThisRun.max(1).log10() / getQCGoal() * 100, 100).toFixed(2) + "%"
		document.getElementById("progressbar").style.width = percentage
		document.getElementById("progresspercent").textContent = percentage
		document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to next Annihilation Tier')
	} else doQuantumProgress()
}

function showAnnihilationTab(tabName) {
	var tabs = document.getElementsByClassName('annihilationtab');
	var tab;
	var oldTab
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.style.display == 'block') oldTab = tab.id
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	closeToolTip()
}

// Anti-Baryons

function getNextAB(display=false,change=0) {
	if (player.aarexModifications.ngp5V===undefined) return undefined
	let nextId = (player.ghostify.annihilation.antibaryons.total+change-1)%4
	if (!display) {
		let ab = ["positrons","antiprotons","antineutrons","antihyperons"]
		return ab[nextId]
	} else {
		let ab = ["Positron","Antiproton","Antineutron","Antihyperon"]
		let suffix = (getABGain()==1)?"":"s"
		return ab[nextId]+suffix
	}
}

function getABGain() {
	if (player.aarexModifications.ngp5V===undefined) return new Decimal(0)
	if (player.ghostify.baryons.hyperons.supercharge.hyperons<5) return new Decimal(0)
	let gain = 1
	return Math.floor(gain)
}

function updateAntiBaryons() {
	document.getElementById("exoticMatter2").textContent = shortenDimensions(player.ghostify.annihilation.exoticMatter)
	document.getElementById("ABGain").textContent = getFullExpansion(getABGain())
	document.getElementById("nextAB").textContent = getNextAB(true)
	document.getElementById("nextABThreshold").textContent = shorten(nextABThreshold())
	let target = Math.floor((1+Math.sqrt(1-4*(-1*(player.ghostify.annihilation.exoticMatter.div(5e3).times(getCascadePowerEff()).plus(1).log10()/Math.log10(getABThresholdInc())))))/2)
	let inc = target - player.ghostify.annihilation.antibaryons.total
	nextAntiBaryon(inc)
	document.getElementById("positrons").textContent = getFullExpansion(player.ghostify.annihilation.antibaryons.positrons)
	document.getElementById("antiprotons").textContent = getFullExpansion(player.ghostify.annihilation.antibaryons.antiprotons)
	document.getElementById("antineutrons").textContent = getFullExpansion(player.ghostify.annihilation.antibaryons.antineutrons)
	document.getElementById("antihyperons").textContent = getFullExpansion(player.ghostify.annihilation.antibaryons.antihyperons)
	document.getElementById('positronEff').textContent = getFullExpansion(Math.round(getAntiBaryonEff('positrons')*100)/100)
	document.getElementById('antiprotonEff').textContent = shorten(getAntiBaryonEff('antiprotons'))
	document.getElementById('antineutronEff').textContent = shorten(getAntiBaryonEff('antineutrons'))
	document.getElementById('antihyperonEff').textContent = getFullExpansion(Math.round((1-1/getAntiBaryonEff('antihyperons'))*1e4)/100)
	document.getElementById('antiBaryonCascade').className = getEachAntiBaryons()>=getCascadeCost() ? "gluonupgrade cascade" : "gluonupgrade unavailablebtn"
	document.getElementById("cascadeCost").textContent = getFullExpansion(getCascadeCost())
}

function nextABThreshold() {
	if (player.aarexModifications.ngp5V===undefined) return new Decimal(1/0)
	if (player.ghostify.baryons.hyperons.supercharge.hyperons<5) return new Decimal(1/0)
	let current = player.ghostify.annihilation.antibaryons.total
	let threshold = Decimal.pow(Decimal.pow(getABThresholdInc(), current), current+1).times(5e3).div(getCascadePowerEff())
	return threshold
}

function getABThresholdInc() {
	let inc = 2
	if (player.ghostify.annihilation.upgrades.includes(26)) inc = 1.6
	return inc
}

function nextAntiBaryon(inc=0) {
	player.ghostify.annihilation.antibaryons.total += inc
	let types = ["positrons","antiprotons","antineutrons","antihyperons"]
	for (i=0;i<4;i++) {
		let type = types[i]
		player.ghostify.annihilation.antibaryons[type] = Math.max(Math.ceil(((player.ghostify.annihilation.antibaryons.total-1)-i)/4),0)
	}
}

function getAntiBaryonEff(type) {
	if (!(["positrons","antiprotons","antineutrons","antihyperons"].includes(type))) return undefined
	let n = ["positrons","antiprotons","antineutrons","antihyperons"].indexOf(type)
	let def = [0,new Decimal(1),new Decimal(1),1][n]
	if (player.aarexModifications.ngp5V===undefined) return def
	if (player.ghostify.baryons.hyperons.supercharge.hyperons<5) return def
	if (currentAnnihilationTier()>0) return def
	if (player.ghostify.annihilation.antibaryons === undefined) return def
	if (n==0) {
		let eff = Math.sqrt(player.ghostify.annihilation.antibaryons[type]*10)
		if (eff>=100) eff = Math.sqrt(eff)*10
		if (eff>=250) eff = Math.cbrt(eff)*Math.pow(250, 2/3)
		return eff
	} else if (n==1) {
		let eff = Decimal.pow(1e5, player.ghostify.annihilation.antibaryons[type])
		if (eff.gte(1e25)) eff = eff.sqrt().times(1e5)
		if (eff.gte(1e50)) eff = eff.cbrt().times(Decimal.pow(1e50, 2/3))
		return eff
	} else if (n==2) {
		let eff = Decimal.pow(1e25, player.ghostify.annihilation.antibaryons[type])
		if (eff.gte(1e100)) eff = eff.sqrt().times(1e50)
		if (eff.gte(Number.MAX_VALUE)) eff = eff.cbrt().times(Decimal.pow(Number.MAX_VALUE, 2/3))
		return eff
	} else if (n==3) {
		let eff = Math.log10(player.ghostify.annihilation.antibaryons[type]+1)/2+1
		if (eff>=1.2) eff = Math.sqrt(eff)*Math.sqrt(1.2)
		if (eff>=1.5) eff = Math.log10(eff)*(1.5/Math.log10(1.5))
		return eff
	}
}

function getEachAntiBaryons() {
	if (player.aarexModifications.ngp5V===undefined) return 0
	return Math.floor((player.ghostify.annihilation.antibaryons.positrons+player.ghostify.annihilation.antibaryons.antiprotons+player.ghostify.annihilation.antibaryons.antineutrons+player.ghostify.annihilation.antibaryons.antihyperons)/4)
}

// Nanofield Toggles

function nanofieldToggle(n) {
	if (player.aarexModifications.ngp5V === undefined) return false
	if (tmp.qu.nanofield['toggles'] === undefined) return false
	if (!isNanofieldToggleAvailable(n)) return false
	return tmp.qu.nanofield['toggles'].includes(n)
}

function updateNanofieldToggles() {
	for (i=1;i<=8;i++) {
		document.getElementById("nanofieldToggle"+i).textContent = "Reward "+i+" Switch: O" +(nanofieldToggle(i) ? "N" : "FF")
		document.getElementById("nanofieldToggle"+i).style.display = isNanofieldToggleAvailable(i) ? "" : "none"
	}
}

function isNanofieldToggleAvailable(n) {
	if (player.aarexModifications.ngp5V === undefined) return false
	if (tmp.qu.nanofield['toggles'] === undefined) return false
	if (player.ghostify.annihilation.upgrades.includes(25) && n%2==1) return true
	if (player.ghostify.annihilation.upgrades.includes(27) && n==8) return true
	return false
}

function nanofieldSwitch(n) {
	if (player.aarexModifications.ngp5V === undefined) return
	if (tmp.qu.nanofield['toggles'] === undefined) return
	if (!isNanofieldToggleAvailable(n)) return
	if (tmp.qu.nanofield['toggles'].includes(n)) {
		for(var i = 0; i < tmp.qu.nanofield['toggles'].length; i++){ 
			if (tmp.qu.nanofield['toggles'][i] === n) {
				tmp.qu.nanofield['toggles'].splice(i, 1); 
			}
		}
	} else tmp.qu.nanofield['toggles'].push(n)
	updateNanofieldToggles()
}

// Cascade

function getCascadeCost() {
	if (player.aarexModifications.ngp5V===undefined) return 1/0
	return 1
}

function cascadeAntiBaryons() {
	if (player.aarexModifications.ngp5V===undefined) return
	if (getEachAntiBaryons()<getCascadeCost()) return
	if (player.ghostify.annihilation.cascade.times<3) if (!confirm("This will reset your Exotic Matter, Anti-Baryons, and Annihilation Upgrades. This will also perform a Light Empowerment reset and exit Annihilation if active. Are you sure you want to do this?")) return
	let gain = getEachAntiBaryons()*4
	updateAnnihilationStorage()
	ghostify(false, true)
	player.ghostify.annihilation.exoticMatter = new Decimal(0)
	player.ghostify.annihilation.antibaryons = {
		positrons: 0,
		antiprotons: 0,
		antineutrons: 0,
		antihyperons: 0,
		total: 0,
	}
	player.ghostify.annihilation.upgrades = []
	player.ghostify.annihilation.active = false
	player.ghostify.ghostlyPhotons.amount=new Decimal(0)
	player.ghostify.ghostlyPhotons.darkMatter=new Decimal(0)
	player.ghostify.ghostlyPhotons.ghostlyRays=new Decimal(0)
	player.ghostify.ghostlyPhotons.lights=[0,0,0,0,0,0,0,0]
	
	player.ghostify.annihilation.cascade.times += 1
	player.ghostify.annihilation.cascade.amount = Math.floor(player.ghostify.annihilation.cascade.amount+gain)
	showAnnihilationTab("cascade")
}

function updateCascade(diff) {
	document.getElementById("cascadedBaryons").textContent = getFullExpansion(player.ghostify.annihilation.cascade.amount)
	document.getElementById("cascades").textContent = getFullExpansion(player.ghostify.annihilation.cascade.times)
	player.ghostify.annihilation.cascade.power = player.ghostify.annihilation.cascade.power.plus(getCascadePowerGain().times(diff/10))
	document.getElementById("cascadePower").textContent = shorten(player.ghostify.annihilation.cascade.power)
	document.getElementById("cascadePowerEff").textContent = shorten(getCascadePowerEff())
	document.getElementById("cascadePowerEff2").textContent = getFullExpansion(Math.round((getCascadePowerEff2()-1)*1e3)/10)
	document.getElementById("cascadePowerEff3").textContent = getFullExpansion(Math.round(getCascadePowerEff3()*100)/100)
	document.getElementById("cascadePowerEff4").textContent = shorten(getCascadePowerEff4())
}

function getCascadePowerGain() {
	let gain = Decimal.pow(player.ghostify.annihilation.cascade.amount, 1.2)
	return gain
}

function getCascadePowerEff() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	let power = player.ghostify.annihilation.cascade.power
	let eff = power.plus(1).pow(0.2)
	return eff
}

function getCascadePowerEff2() {
	if (player.aarexModifications.ngp5V === undefined) return 1
	let power = player.ghostify.annihilation.cascade.power
	let eff = Math.pow(power.plus(1).log10()+1, 0.1)
	if (eff>=2) eff = Math.sqrt(eff)*Math.sqrt(2)
	if (eff>=4) eff = Math.cbrt(eff)*Math.pow(4, 2/3)
	if (eff>=8) eff = Math.cbrt(eff)*Math.pow(8, 2/3)
	if (eff>=10) eff = Math.pow(eff, 0.2)*Math.pow(10, 0.8)
	if (eff>=15) eff = Math.pow(10, Math.pow(Math.log10(eff), 0.75))
	if (eff>=25) eff = Math.log10(eff)/Math.log10(5)*12.5
	if (eff>=40) eff = Math.log10(eff)/Math.log10(40)*40
	return eff
}

function getCascadePowerEff3() {
	if (player.aarexModifications.ngp5V === undefined) return 0
	let power = player.ghostify.annihilation.cascade.power
	let eff = power.plus(1).log10()
	if (eff>=10) eff = Math.sqrt(eff)*Math.sqrt(10)
	if (eff>=500) eff = Math.cbrt(eff)*Math.pow(500, 2/3)
	return eff
}

function getCascadePowerEff4() {
	if (player.aarexModifications.ngp5V === undefined) return new Decimal(1)
	if (player.ghostify.annihilation.cascade.power.lte(0)) return new Decimal(1)
	let power = player.ghostify.annihilation.cascade.power
	let eff = Decimal.pow(power.add(1).log10()+1, 2)
	return eff
}