import React from "react";
import Card from "./Card";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useSelector } from "react-redux";

const recentBooks = [
  {
    id: "1098127463",
    title: "Security as Code",
    subtitle: "DevSecOps Patterns with AWS",
    authors: "BK Sarthak Das, Virginia Chu",
    image: "https://www.dbooks.org/img/books/1098127463s.jpg",
    url: "https://www.dbooks.org/security-as-code-1098127463/",
  },
  {
    id: "1805112015",
    title: "Financing Investment in Times of High Public Debt",
    subtitle: "2023 European Public Investment Outlook",
    authors: "Floriana Cerniglia, Francesco Saraceno, Andrew Watt",
    image: "https://www.dbooks.org/img/books/1805112015s.jpg",
    url: "https://www.dbooks.org/financing-investment-in-times-of-high-public-debt-1805112015/",
  },
  {
    id: "164200233X",
    title: "ASP.NET Core 6 Succinctly",
    subtitle: "",
    authors: "Dirk Strauss",
    image: "https://www.dbooks.org/img/books/164200233Xs.jpg",
    url: "https://www.dbooks.org/aspnet-core-6-succinctly-164200233x/",
  },
  {
    id: "199013209X",
    title: "Engineering Systems Dynamics, Modelling, Simulation, and Design",
    subtitle: "Lagrangian and Bond Graph Methods",
    authors: "Mehrzad Tabatabaian",
    image: "https://www.dbooks.org/img/books/199013209Xs.jpg",
    url: "https://www.dbooks.org/engineering-systems-dynamics-modelling-simulation-and-design-199013209x/",
  },
  {
    id: "5709901124",
    title: "Build a Raspberry Pi Media Player",
    subtitle: "Power up your TV and music system",
    authors: "PJ Evans",
    image: "https://www.dbooks.org/img/books/5709901124s.jpg",
    url: "https://www.dbooks.org/build-a-raspberry-pi-media-player-5709901124/",
  },
  {
    id: "191204742X",
    title: "The Official Raspberry Pi Handbook 2023",
    subtitle: "",
    authors:
      "David Crookes, PJ Evans, Rosie Hattersley, Phil King, Nicola King, KG Orphanides, Nik Rawlinson, Mark Vanstone",
    image: "https://www.dbooks.org/img/books/191204742Xs.jpg",
    url: "https://www.dbooks.org/the-official-raspberry-pi-handbook-2023-191204742x/",
  },
  {
    id: "5685804586",
    title: "Pay for Play",
    subtitle: "How the Music Industry Works, Where the Money Goes, and Why",
    authors: "Larry Wayte",
    image: "https://www.dbooks.org/img/books/5685804586s.jpg",
    url: "https://www.dbooks.org/pay-for-play-5685804586/",
  },
  {
    id: "1642002275",
    title: "Azure Bot Service Succinctly",
    subtitle: "",
    authors: "Ed Freitas",
    image: "https://www.dbooks.org/img/books/1642002275s.jpg",
    url: "https://www.dbooks.org/azure-bot-service-succinctly-1642002275/",
  },
  {
    id: "1607826593",
    title: "Introductory Algebra",
    subtitle: "",
    authors: "Anne Gloag, Andrew Gloag, Melissa Kramer",
    image: "https://www.dbooks.org/img/books/1607826593s.jpg",
    url: "https://www.dbooks.org/introductory-algebra-1607826593/",
  },
  {
    id: "1098111389",
    title: "Managing Cloud Native Data on Kubernetes",
    subtitle:
      "Architecting Cloud Native Data Services Using Open Source Technology",
    authors: "Jeff Carpenter, Patrick McFadin",
    image: "https://www.dbooks.org/img/books/1098111389s.jpg",
    url: "https://www.dbooks.org/managing-cloud-native-data-on-kubernetes-1098111389/",
  },
  {
    id: "1912047446",
    title: "An Introduction to C &amp; GUI Programming",
    subtitle: "",
    authors: "Simon Long",
    image: "https://www.dbooks.org/img/books/1912047446s.jpg",
    url: "https://www.dbooks.org/an-introduction-to-c-gui-programming-1912047446/",
  },
  {
    id: "1711470546",
    title: "Contemporary Mathematics",
    subtitle: "",
    authors: "Donna Kirk",
    image: "https://www.dbooks.org/img/books/1711470546s.jpg",
    url: "https://www.dbooks.org/contemporary-mathematics-1711470546/",
  },
  {
    id: "1642002305",
    title: "Svelte Succinctly",
    subtitle: "",
    authors: "Ed Freitas",
    image: "https://www.dbooks.org/img/books/1642002305s.jpg",
    url: "https://www.dbooks.org/svelte-succinctly-1642002305/",
  },
];

const editorPics = [
  {
    id: "3030113302",
    title: "Handbook of Pathogens and Diseases in Cephalopods",
    subtitle: "",
    authors:
      "Camino Gestal, Santiago Pascual, Ángel Guerra, Graziano Fiorito, Juan M. Vieites",
    image: "https://www.dbooks.org/img/books/3030113302s.jpg",
    url: "https://www.dbooks.org/handbook-of-pathogens-and-diseases-in-cephalopods-3030113302/",
  },
  {
    id: "3030118991",
    title: "The Biopsychosocial Model of Health and Disease",
    subtitle: "New Philosophical and Scientific Developments",
    authors: "Derek Bolton, Grant Gillett",
    image: "https://www.dbooks.org/img/books/3030118991s.jpg",
    url: "https://www.dbooks.org/the-biopsychosocial-model-of-health-and-disease-3030118991/",
  },
  {
    id: "3319314424",
    title:
      "Cohabitation and Marriage in the Americas: Geo-historical Legacies and New Trends",
    subtitle: "",
    authors: "Albert Esteve , Ron J. Lesthaeghe",
    image: "https://www.dbooks.org/img/books/3319314424s.jpg",
    url: "https://www.dbooks.org/cohabitation-and-marriage-in-the-americas-geo-historical-legacies-and-new-trends-3319314424/",
  },
  {
    id: "3030191826",
    title: "Policing and Minority Communities",
    subtitle: "Contemporary Issues and Global Perspectives",
    authors: "James F. Albrecht, Garth den Heyer, Perry Stanislas",
    image: "https://www.dbooks.org/img/books/3030191826s.jpg",
    url: "https://www.dbooks.org/policing-and-minority-communities-3030191826/",
  },
  {
    id: "3319578839",
    title: "Eye Tracking Methodology",
    subtitle: "Theory and Practice",
    authors: "Andrew T. Duchowski",
    image: "https://www.dbooks.org/img/books/3319578839s.jpg",
    url: "https://www.dbooks.org/eye-tracking-methodology-3319578839/",
  },
  {
    id: "1509302808",
    title: "Windows 10 IT Pro Essentials: Support Secrets",
    subtitle: "",
    authors: "Ed Bott",
    image: "https://www.dbooks.org/img/books/1509302808s.jpg",
    url: "https://www.dbooks.org/windows-10-it-pro-essentials-support-secrets-1509302808/",
  },
  {
    id: "1452",
    title: "iOS Developer Notes for Professionals",
    subtitle: "",
    authors: "Stack Overflow Community",
    image: "https://www.dbooks.org/img/books/1452s.jpg",
    url: "https://www.dbooks.org/ios-developer-notes-for-professionals-1452/",
  },
  {
    id: "1453",
    title: "Android Notes for Professionals",
    subtitle: "",
    authors: "Stack Overflow Community",
    image: "https://www.dbooks.org/img/books/1453s.jpg",
    url: "https://www.dbooks.org/android-notes-for-professionals-1453/",
  },
  {
    id: "1462",
    title: "AngularJS Notes for Professionals",
    subtitle: "",
    authors: "Stack Overflow Community",
    image: "https://www.dbooks.org/img/books/1462s.jpg",
    url: "https://www.dbooks.org/angularjs-notes-for-professionals-1462/",
  },
  {
    id: "1473",
    title: "SQL Server Metadata Succinctly",
    subtitle: "",
    authors: "Joseph D. Booth",
    image: "https://www.dbooks.org/img/books/1473s.jpg",
    url: "https://www.dbooks.org/sql-server-metadata-succinctly-1473/",
  },
  {
    id: "1509302786",
    title: "Windows 10 IT Pro Essentials: Top 10 Tools",
    subtitle: "",
    authors: "Ed Bott",
    image: "https://www.dbooks.org/img/books/1509302786s.jpg",
    url: "https://www.dbooks.org/windows-10-it-pro-essentials-top-10-tools-1509302786/",
  },
  {
    id: "1494",
    title: "Visual Studio 2019 Succinctly",
    subtitle: "",
    authors: "Alessandro Del Sole",
    image: "https://www.dbooks.org/img/books/1494s.jpg",
    url: "https://www.dbooks.org/visual-studio-2019-succinctly-1494/",
  },
  {
    id: "1499",
    title: "Laravel 5 Official Documentation",
    subtitle: "",
    authors: "Gary Blankenship",
    image: "https://www.dbooks.org/img/books/1499s.jpg",
    url: "https://www.dbooks.org/laravel-5-official-documentation-1499/",
  },
  {
    id: "1524",
    title: "Qt5 Cadaques",
    subtitle: "",
    authors: "J. Ryannel, J. Thelin",
    image: "https://www.dbooks.org/img/books/1524s.jpg",
    url: "https://www.dbooks.org/qt5-cadaques-1524/",
  },
];

const EditorPicks = () => {
  const recentlyViewed = useSelector(
    (state) => state.recentlyViewed.recentlyViewed
  );
  return (
    <>
      <section className="bg-gray-700 py-10 leading-6 text-gray-100 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-mono font-bold">
              Explore open access and unlimited academic literature across all
              desciplines
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mt-16 lg:grid-cols-4">
            <div className="relative overflow-hidden border-t-4 border-cyan-500 bg-gray-500 shadow">
              <div className="px-6 py-10">
                <div className="flex flex-col items-center">
                  <div className="ml-1 text-base font-medium capitalize">
                    Trusted by over
                  </div>
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    98.6K+
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border-t-4 border-cyan-500 bg-gray-500 shadow">
              <div className="px-6 py-10">
                <div className="flex flex-col items-center">
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    5.1M+
                  </h3>
                  <div className="ml-3 text-base font-medium capitalize items-center align-center">
                    Publications
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border-t-4 border-cyan-500 bg-gray-500 shadow">
              <div className="px-6 py-10">
                <div className="flex flex-col items-center">
                  <div className="ml-3 text-base font-medium capitalize">
                    Downloads
                  </div>
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    19.9K+
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden border-t-4 border-cyan-500 bg-gray-500 shadow">
              <div className="px-6 py-10">
                <div className="flex flex-col items-center">
                  <h3 className="relative ml-2 inline-block text-4xl font-bold leading-none">
                    99.9%
                  </h3>
                  <div className="ml-3 text-base font-medium capitalize">
                    Happy Readers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background text-foreground py-1 leading-6">
        <a href="/books" className="flex justify-between m-4 cursor-pointer">
          <h2 className="text-2xl font-serif mx-4">Recently added</h2>
          <p>
            Explore
            <KeyboardDoubleArrowRightIcon />
          </p>
        </a>
        <div className="flex-grow flex flex-row overflow-x-auto no-scrollbar h-fit my-4 mx-2">
          <div className="flex flex-nowrap py-4">
            {recentBooks.map((book) => (
              <div key={book.id} className="w-56 h-full mx-2">
                <Card key={book.id} book={book} className="h-120" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background text-foreground py-1 leading-6">
        <div className="flex justify-between m-4">
          <h2 className="text-2xl font-serif mx-4">{"Editor's picks"}</h2>
        </div>
        <div className="flex-grow flex flex-row overflow-x-auto no-scrollbar h-fit my-4 mx-2">
          <div className="flex flex-nowrap py-4">
            {editorPics.map((book) => (
              <div key={book.id} className="w-56 h-full mx-2">
                <Card key={book.id} book={book} className="h-120" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {recentlyViewed && recentlyViewed.length > 0 && (
        <section className="bg-background text-foreground py-1 leading-6">
          <div className="flex justify-between m-4">
            <h2 className="text-2xl font-serif mx-4">Recently Viewed</h2>
          </div>
          <div className="flex-grow flex flex-row overflow-x-auto no-scrollbar h-fit my-4 mx-2">
            <div className="flex flex-nowrap py-4">
              {recentlyViewed.map((book) => (
                <div key={book.id} className="w-56 h-full mx-2">
                  <Card key={book.id} book={book} className="h-120" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EditorPicks;
