import "./Table.scss";

const Table = () => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <tr>
                    <th>Guest Participants Name</th>
                    <th>Date Of Invite</th>
                    <th>Response Deadline</th>
                    <th>Status Of Response</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>Glenn Cross</td>
                    <td>01/20/2026, 12:00 AM </td>
                    <td>01/24/2026</td>
                    <td>In Progress</td>
                    <td><button type="button" className="resend-btn btn btn-outline">Resend Invite</button></td>
                </tr>
                <tr>
                    <td>Nick Johnson</td>
                    <td>01/22/2026, 12:00 AM </td>
                    <td>01/26/2026</td>
                    <td>Completed</td>
                    <td><button type="button" className="resend-btn btn btn-outline">Resend Invite</button></td>
                </tr>
                <tr>
                    <td>Selena Rameez</td>
                    <td>01/21/2026, 12:00 AM </td>
                    <td>01/22/2026</td>
                    <td>In Progress</td>
                    <td><button type="button" className="resend-btn btn btn-outline">Resend Invite</button></td>
                </tr>
                <tr>
                    <td>Nicole White </td>
                    <td>01/20/2026, 12:00 AM </td>
                    <td>01/24/2026</td>
                    <td>In Progress</td>
                    <td><button type="button" className="resend-btn btn btn-outline">Resend Invite</button></td>
                </tr>
                <tr>
                    <td>Glenn Cross</td>
                    <td>01/20/2026, 12:00 AM </td>
                    <td>01/24/2026</td>
                    <td>In Progress</td>
                    <td><button type="button" className="resend-btn btn btn-outline">Resend Invite</button></td>
                </tr>
            </table>
        </div>
    );
};

export default Table;