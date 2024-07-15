import { observer } from "mobx-react-lite";
import { ReactElement } from "react";
import { InputText } from "primereact/inputtext";
import { CurrencyInput, DateInput } from "dashboard/common/form/inputs";
import { Dropdown } from "primereact/dropdown";
import { useStore } from "store/hooks";
import { InputNumber } from "primereact/inputnumber";
import { PAYMENT_FREQUENCY_LIST, TERM_MONTH_LIST } from "common/constants/contract-options";
import { Checkbox } from "primereact/checkbox";

export const DealLeaseHerePayHere = observer((): ReactElement => {
    const store = useStore().dealStore;
    const {
        deal: { accountInfo, dateeffective, datepurchase },
        dealExtData: {
            Con_Pmt_Freq,
            Con_Term,
            Con_Pmt_Amt,
            Con_Lease_Prop_Tax,
            Con_Total_of_Pmts,
            Con_Lease_Purch_Option,
            Con_Lease_Taxes,
            Con_Late_Fee,
            Con_Grace_Period,
            Con_Lease_Miles,
            Con_Lease_Overage,
            Con_Lease_Termination_Fee,
        },
        dealFinance: { Depreciation },
        changeDeal,
        changeDealExtData,
        changeDealFinance,
    } = store;
    return (
        <div className='grid deal-lease row-gap-2'>
            <div className='col-3'>
                <span className='p-float-label'>
                    <InputText
                        value={accountInfo}
                        onChange={({ target: { value } }) =>
                            changeDeal({ key: "accountInfo", value })
                        }
                        className='deal-lease__text-input w-full'
                    />
                    <label className='float-label'>Account Number</label>
                </span>
            </div>

            <hr className='form-line' />

            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    title='Depreciation'
                    value={parseInt(Depreciation)}
                    onChange={({ value }) =>
                        changeDealFinance({ key: "Depreciation", value: value || 0 })
                    }
                />
            </div>
            <div className='col-3'>
                <span className='p-float-label'>
                    <Dropdown
                        optionLabel='name'
                        optionValue='id'
                        value={Con_Pmt_Freq}
                        onChange={({ target: { value } }) =>
                            changeDealExtData({ key: "Con_Pmt_Freq", value })
                        }
                        options={PAYMENT_FREQUENCY_LIST}
                        filter
                        required
                        className='w-full deal-lease__dropdown'
                    />
                    <label className='float-label'>Payment Frequency</label>
                </span>
            </div>
            <div className='col-3'>
                <span className='p-float-label'>
                    <Dropdown
                        value={Con_Term}
                        onChange={({ target: { value } }) =>
                            changeDealExtData({ key: "Con_Term", value })
                        }
                        options={TERM_MONTH_LIST}
                        editable
                        filter
                        required
                        className='w-full deal-lease__dropdown'
                    />
                    <label className='float-label'>Term (months)</label>
                </span>
            </div>
            <div className='col-3'>
                <span className='p-float-label'>
                    <InputNumber min={1} className='deal-lease__text-input w-full' />
                    <label className='float-label'>Money Factor</label>
                </span>
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    value={Con_Pmt_Amt}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Pmt_Amt", value: value || 0 })
                    }
                    title='Payment'
                />
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    value={Con_Lease_Prop_Tax}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Lease_Prop_Tax", value: value || 0 })
                    }
                    title='Monthly Prop. Tax'
                />
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    value={Con_Total_of_Pmts}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Total_of_Pmts", value: value || 0 })
                    }
                    title='Total Payment'
                />
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    value={Con_Lease_Purch_Option}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Lease_Purch_Option", value: value || 0 })
                    }
                    title='Purchase Option'
                />
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    value={Con_Lease_Taxes}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Lease_Taxes", value: value || 0 })
                    }
                    title='Expected Taxes and Fees'
                />
            </div>
            <div className='col-3'>
                <DateInput
                    name='Sale Date'
                    date={parseInt(datepurchase)}
                    onChange={({ value }) =>
                        changeDeal({ key: "datepurchase", value: String(value) })
                    }
                />
            </div>
            <div className='col-3'>
                <DateInput name='Second Payment Due' />
            </div>
            <div className='col-3'>
                <DateInput name='Final Payment Due' />
            </div>

            <div className='col-4 flex align-items-center'>
                <Checkbox
                    inputId='lease-first-payment'
                    name='lease-first-payment'
                    checked={false}
                />
                <label htmlFor='lease-first-payment' className='ml-2'>
                    First Payment Due on Delivery
                </label>
            </div>

            <hr className='form-line' />

            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    value={Con_Late_Fee}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Late_Fee", value: value || 0 })
                    }
                    title='Late Fee'
                />
            </div>
            <div className='col-3'>
                <span className='p-float-label'>
                    <InputNumber
                        min={1}
                        className='deal-lease__text-input w-full'
                        value={Con_Grace_Period}
                        onChange={({ value }) =>
                            changeDealExtData({ key: "Con_Grace_Period", value: value || 0 })
                        }
                    />
                    <label className='float-label'>Grace Period</label>
                </span>
            </div>
            <div className='col-3'>
                <DateInput
                    name='Effective Date'
                    date={parseInt(dateeffective)}
                    onChange={({ value }) =>
                        changeDeal({ key: "dateeffective", value: String(value) })
                    }
                />
            </div>
            <div className='col-3'>
                <span className='p-float-label'>
                    <InputNumber
                        min={1}
                        className='deal-lease__text-input w-full'
                        value={Con_Lease_Miles}
                        onChange={({ value }) =>
                            changeDealExtData({ key: "Con_Lease_Miles", value: value || 0 })
                        }
                    />
                    <label className='float-label'>Miles per Year</label>
                </span>
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    title='Overage Cost'
                    value={Con_Lease_Overage}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Lease_Overage", value: value || 0 })
                    }
                />
            </div>
            <div className='col-3'>
                <CurrencyInput
                    labelPosition='top'
                    title='Termination Fee'
                    value={Con_Lease_Termination_Fee}
                    onChange={({ value }) =>
                        changeDealExtData({ key: "Con_Lease_Termination_Fee", value: value || 0 })
                    }
                />
            </div>
        </div>
    );
});