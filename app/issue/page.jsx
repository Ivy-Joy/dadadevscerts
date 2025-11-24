import IssueForm from '../../components/IssueForm';
export default function IssuePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold" style={{color:'#F16522'}}>Issue Certificate</h2>
      <p className="text-gray-600 mt-1">Fill details and issue a signed certificate.</p>
      <div className="mt-6"><IssueForm /></div>
    </div>
  );
}
