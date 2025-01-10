export const GenderOptions = ["male", "female", "other"] as const;

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNum: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Mauro Méndez",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Nahir Galarza",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Santiago Ascacibar",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Guido Carrillo",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Lizy Tagliani",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Luciano Giménez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Wanda Nara",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "China Suárez",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Alexis Manyoma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};