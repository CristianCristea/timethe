import * as JsPDF from 'jspdf';
import moment from 'moment';
import { autoTable } from 'jspdf-autotable';

export const selectProject = (projects, projectName) => (
  projects.find(project => project.name === projectName));

export const getTotalSessionsTime = (sessions) => {
  return sessions.reduce((sum, session) => (sum += session.seconds), 0);
};

export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);
  const isPlural = unit => (unit !== 1 ? 's' : '');

  return `${h} hour${isPlural(h)}  ${m} minute${isPlural(m)}`;
};

export const handlePrintProject = () => {
  window.print();
};

export const capitalizeString = s => (s[0].toUpperCase() + s.substring(1));

export const handleGeneratePDF = (project, totalSessionsTime) => {
  const {
    name,
    description,
    sessions,
    startDate,
    archived,
  } = project;
  const doc = new JsPDF('p', 'pt', 'a4');
  const sessionTableColumns = ['#', 'Date', 'Note', 'Time'];
  const sessionTableRows = sessions.map((s, i) => {
    const formatSession = Object.values(s);
    formatSession.splice(-1, 1, totalSessionsTime);

    return [i + 1, ...formatSession];
  });
  const titleMarginLeft = 40;
  const titleMarginTop = 30;
  const descriptionMarginTop = titleMarginTop + 50;

  // PDF options
  doc.setFontSize(16);

  // set max text length
  const splitTitle = doc.splitTextToSize(capitalizeString(name), 300);
  const splitDescription = doc.splitTextToSize(description, 500);

  // generate PDF
  doc.autoTable(
    sessionTableColumns,
    sessionTableRows,
    {
      columnStyles: {
        id: { fillColor: 255 },
      },
      margin: { top: descriptionMarginTop + 200 },
      addPageContent() {
        doc.text(splitTitle, titleMarginLeft, titleMarginTop);
        doc.text(splitDescription, titleMarginLeft, descriptionMarginTop);
        doc.text(`${moment.unix(startDate).format('dddd, MMMM Do YYYY')} - ${archived}`, titleMarginLeft, descriptionMarginTop + 150);
      },
    },
  );

  doc.save('document.pdf');
};

