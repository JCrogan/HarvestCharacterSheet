window.onload = createSkills;

function createSkills(){
    const skills = [
    { name: "Accounting", base: 5 },
    { name: "Appraise", base: 5 },
    { name: "Archaeology", base: 1 },
    { input: true, base: 1, placeholder: "Arts/Craft" },
    { input: true, base: 1 },
    { name: "Charm", base: 15 },
    { name: "Climb", base: 15 },
    { name: "Computer Use", base: 0 },
    { name: "Credit Rating", base: 1 },
    { name: "Cthulhu Mythos", base: 0 },
    { name: "Demolitions", base: 1 },
    { name: "Disguise", base: 5 },
    { name: "Diving", base: 1 },
    { name: "Dodge", base: "half DEX" },
    { name: "Drive Auto", base: 20 },
    { name: "Elec. Repair", base: 10 },
    { name: "Fast Talk", base: 5 },
    { name: "Fighting", base: 25, subname: "Brawl" },
    { input: true, placeholder: "Fighting" },

    { name: "Firearms", base: 20, subname: "Handgun" },
    { name: "Firearms", base: 25, subname: "Rifle/Shotgun" },
    { input: true, base: 1, placeholder: "Firearms" },
    { name: "First Aid", base: 30 },
    { name: "History", base: 5 },
    { name: "Intimidate", base: 15 },
    { name: "Jump", base: 20 },
    { input: true, base: 1, placeholder: "Language (Other)" },
    { input: true },
    { input: true, base: "EDU", placeholder: "Language (Own)" },
    { name: "Law", base: 5 },
    { name: "Library Use", base: 20 },
    { name: "Listen", base: 20 },
    { name: "Locksmith", base: 1 },
    { name: "Mech. Repair", base: 10 },
    { name: "Medicine", base: 1 },
    { name: "Natural World", base: 10 },
    { name: "Navigate", base: 10 },
    { name: "Occult", base: 5 },
    
    { name: "Persuade", base: 10 },
    { input: true, base: 1, placeholder: "Pilot" },
    { name: "Psychoanalysis", base: 1 },
    { name: "Psychology", base: 1 },
    { name: "Read Lips", base: 1 },
    { name: "Ride", base: 5 },
    { input: true, base: 1, placeholder: "Science" },
    { input: true, base: 1 },
    { input: true, base: 1 },
    { name: "Sleight of Hand", base: 10 },
    { name: "Spot Hidden", base: 25 },
    { name: "Stealth", base: 20 },
    { input: true, base: 10, placeholder: "Survival" },
    { name: "Swim", base: 20 },
    { name: "Throw", base: 20 },
    { name: "Track", base: 10 },
    { input: true },
    { input: true },
    { input: true }
    ];

    let allSkills = ``;

    for (let i = 0; i<skills.length; i++)
    {
        let skillName = `<p class="skillName">${skills[i].name}<span class="skillBase">(${skills[i].base}%)</span></p>`;
        let subName = ``;

        if(skills[i].input)
        {
            skillName = `<p class="skillName"><input class="skillNameIn" type="text" tabindex="-1"></p>`
        }

        if(skills[i].subname)
        {
            subName = `<p class="skillNameSubName">[${skills[i].subname}]</p>`;;
        }

        if(skills[i].placeholder)
        {
            subName = `<p class="skillNamePlaceholder">${skills[i].placeholder}</p>`;
        }

        let skillTemplate = `<div class="skill" data-skill-index="${i}">
                                <input class="usedChkBx" type="checkbox" tabindex="-1">

                                <div class="skillNameContainer">
                                    ${skillName}
                                    ${subName}
                                </div>

                                <table class="skillValsTable">
                                    <tr class="skillVals">
                                        <td><input type="text" class="reg" maxlength="3"></td>
                                        <td><input type="text" class="half" readonly tabindex="-1"></td>
                                        <td><input type="text" class="fifth" readonly tabindex="-1"></td>
                                    </tr>
                                </table>
                            </div>`
                            
       allSkills += skillTemplate;
    }
    document.querySelector('.skillContainer').innerHTML += allSkills; // adds skills to container

    
    document.querySelectorAll(".skill").forEach(skill => 
    {
        skill.addEventListener("input",  updateSkill);
        skill.addEventListener("change",  updateSkill);
        
    });
        
    loadSkills();

    function updateSkill(event)
    {
        const skill      = event.target.closest(".skill");
        let skillIndex   = skill.dataset.skillIndex;
        let usrSkillName = skill.querySelector(".skillNameIn");

        let chkBx    = skill.querySelector(".usedChkBx");
        let regVal   = skill.querySelector(".reg").value;
        const half   = skill.querySelector(".half");
        const fifth  = skill.querySelector(".fifth");

        if(event.target.classList.contains("usedChkBx")) { 
            console.log(chkBx.checked);
            console.log(skillIndex);  
        }
        if(event.target.classList.contains("reg"))
        {

        //Replace any non ints with a blank space
        event.target.value =  event.target.value.replace(/[^0-9]/g, '');
            
            if (!regVal || regVal > 100) // if the skill's regular value is empty replace the half and fifth vals with ""
            { 
                half.value  = "";
                fifth.value = "";
                event.target.value = "";
            } 
            else 
            {
                half.value  = Math.floor(Number(regVal) * 0.5);
                fifth.value = Math.floor(Number(regVal) * 0.2);
            }
        }
        
        let skills = JSON.parse(localStorage.getItem("skills"));
        if (skills === null){skills={};}

        skills[skillIndex] = {
            isChecked: chkBx.checked,
            reg: regVal,
            customSkillName: usrSkillName ? usrSkillName.value : ""
        };

        localStorage.setItem("skills", JSON.stringify(skills));
    };

    function loadSkills()
    {
        let skills = JSON.parse(localStorage.getItem("skills"));
        if (skills === null){skills={};}

        document.querySelectorAll(".skill").forEach(skill =>
        {        
            const skillIndex   = skill.dataset.skillIndex;
            const curSkill     = skills[skillIndex];
            

            if(!curSkill)
            {
                return;
            }

            const chkBx        = skill.querySelector(".usedChkBx");
            const reg          = skill.querySelector(".reg");
            const half         = skill.querySelector(".half");
            const fifth        = skill.querySelector(".fifth");
            const usrSkillName = skill.querySelector(".skillNameIn");

            if(curSkill.isChecked === false && curSkill.reg === "")
            {
                delete skills[skillIndex];
                localStorage.setItem("skills", JSON.stringify(skills));
            }
            
            if(Object.keys(skills).length===0){
                localStorage.removeItem("skills");
            }

            chkBx.checked      = curSkill.isChecked;
            reg.value          = curSkill.reg;
            if (usrSkillName) {
                if(curSkill.customSkillName!==undefined)
                {
                    usrSkillName.value = curSkill.customSkillName;
                }
                else
                {
                    usrSkillName.value = "";
                }
            }

            if (!reg.value || Number(reg.value) > 100) // if the skill's regular value is empty replace the half and fifth vals with ""
            { 
                half.value  = "";
                fifth.value = "";
            } 
            else 
            {
                half.value  = Math.floor(Number(reg.value) * 0.5);
                fifth.value = Math.floor(Number(reg.value) * 0.2);
            }
        });
    };
};


