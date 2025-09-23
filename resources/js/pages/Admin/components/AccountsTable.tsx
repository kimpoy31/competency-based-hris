import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';

const AccountsTable = () => {
    return (
        <>
            <Card>
                <div className="flex items-center justify-between">
                    <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">Accounts</h1>
                    <div className="card-actions flex gap-2">
                        {/* 🔍 Search Field */}
                        <input
                            type="text"
                            placeholder="Search account..."
                            className="input-bordered input input-sm w-48"
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="btn btn-sm btn-neutral"
                            // onClick={() => {
                            //     setOfficeModalMode('create');
                            //     setOfficeModalData({ id: 0, name: '' });
                            //     openModal(modalIds.officeFormModal);
                            // }}
                        >
                            New Account
                        </button>
                    </div>
                </div>
                <DisplayEmpty />
            </Card>
        </>
    );
};

export default AccountsTable;
