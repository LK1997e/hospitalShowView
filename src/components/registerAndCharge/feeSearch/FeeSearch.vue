<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#41cde5;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="top">
        <el-col :span="4" class="grid-content">
          <span style="font-size:30px;color: white;"> <i class="el-icon-search"></i>费用查询</span>
        </el-col>
        <el-col class="grid-content" :span="6" :offset="1">
          <el-form :model="condition" :rules="rules" class="demo-ruleForm">
            <el-form-item prop="search">
              <el-input v-model.number="condition.search" @change="handleSearchChange" style="font-size:20px;" clearable
                        placeholder="请输入费用相关信息"></el-input>
              <el-input type="text" style="display:none"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow" type="flex" align="middle">

        <el-col :span="24"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>


          <el-col :span="2" class="el-col-display">开始时间</el-col>

          <el-date-picker
            style="float: left;margin-left: 8px"
            v-model="condition.startDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="handleStartDateChange">
          </el-date-picker>


          <el-col :span="2" class="el-col-display">结束时间</el-col>

          <el-date-picker
            style="float: left;margin-left: 8px"
            v-model="condition.endDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="handleEndDateChange">
          </el-date-picker>


        </el-col>
      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-tabs v-model="condition.payStatus" @tab-click="handlePayStatusChange">
              <el-tab-pane label="已缴费" name="133"></el-tab-pane>
              <el-tab-pane label="未缴费" name="134"></el-tab-pane>
              <el-tab-pane label="已退费" name="135"></el-tab-pane>
            </el-tabs>
          </el-col>

          <el-header>
            <el-divider content-position="left">费用清单</el-divider>
          </el-header>

          <!--挂号费清单 -->
          <template v-if="tollExist.regExist">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-divider content-position="left">挂号费</el-divider>
              <el-table
                ref="multipleTable"
                :data="tollRegList"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="患者费用编号" prop="id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="挂号编号" prop="chargeItemID">
                        <span>{{ props.row.chargeItemID }}</span>
                      </el-form-item>
                      <el-form-item label="病历编号" prop="medicalRecordID">
                        <span>{{ props.row.medicalRecordID }}</span>
                      </el-form-item>
                      <el-form-item label="病历号" prop="medicalRecordNo">
                        <span>{{ props.row.medicalRecordNo }}</span>
                      </el-form-item>
                      <el-form-item label="患者编号" prop="patientID">
                        <span>{{ props.row.patientID }}</span>
                      </el-form-item>
                      <el-form-item label="患者姓名" prop="patientName">
                        <span>{{ props.row.patientName }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别编号" prop="feeCategoryID">
                        <span>{{ props.row.feeCategoryID }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别" prop="feeCategoryName">
                        <span>{{ props.row.feeCategoryName }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目类型编号" prop="expID">
                        <span>{{ props.row.expID }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目" prop="name">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生编号" prop="appearUserID">
                        <span>{{ props.row.appearUserID }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生名字" prop="appearName">
                        <span>{{ props.row.appearName }}</span>
                      </el-form-item>
                      <el-form-item label="收费员编号" prop="tollManID">
                        <span>{{ props.row.tollManID }}</span>
                      </el-form-item>
                      <el-form-item label="收费员名字" prop="tollName">
                        <span>{{ props.row.tollName }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态编号" prop="payStatus">
                        <span>{{ props.row.payStatus }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态" prop="payStatusName">
                        <span>{{ props.row.payStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态编号" prop="dateStatus">
                        <span>{{ props.row.dateStatus }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态" prop="dateStatusName">
                        <span>{{ props.row.dateStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="费用产生日期" prop="feeAppearDate">
                        <span>{{ props.row.feeAppearDate }}</span>
                      </el-form-item>
                      <el-form-item label="收费时间" prop="tollDate">
                        <span>{{ props.row.tollDate }}</span>
                      </el-form-item>
                      <el-form-item label="金额" prop="fee">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="挂号编号" prop="chargeItemID">
                </el-table-column>
                <el-table-column label="收费类别" prop="feeCategoryName">
                </el-table-column>
                <el-table-column label="费用科目" prop="name">
                </el-table-column>
                <el-table-column label="创建医生" prop="appearName">
                </el-table-column>
                <el-table-column label="金额" prop="fee">
                </el-table-column>
                <el-table-column label="缴费状态" prop="payStatusName">
                </el-table-column>
                <el-table-column label="日结状态" prop="dateStatusName">
                </el-table-column>
              </el-table>
            </el-col>
          </template>
          <!--检查检验费清单-->
          <template v-if="tollExist.inspectExist">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-divider content-position="left">检查检验费</el-divider>
              <el-table
                ref="multipleTable"
                :data="tollInspectList"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="患者费用编号" prop="id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="项目检查检验编号" prop="chargeItemID">
                        <span>{{ props.row.chargeItemID }}</span>
                      </el-form-item>
                      <el-form-item label="病历编号" prop="medicalRecordID">
                        <span>{{ props.row.medicalRecordID }}</span>
                      </el-form-item>
                      <el-form-item label="病历号" prop="medicalRecordNo">
                        <span>{{ props.row.medicalRecordNo }}</span>
                      </el-form-item>
                      <el-form-item label="患者编号" prop="patientID">
                        <span>{{ props.row.patientID }}</span>
                      </el-form-item>
                      <el-form-item label="患者姓名" prop="patientName">
                        <span>{{ props.row.patientName }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别编号" prop="feeCategoryID">
                        <span>{{ props.row.feeCategoryID }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别" prop="feeCategoryName">
                        <span>{{ props.row.feeCategoryName }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目类型编号" prop="expID">
                        <span>{{ props.row.expID }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目" prop="expName">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生编号" prop="appearUserID">
                        <span>{{ props.row.appearUserID }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生名字" prop="appearName">
                        <span>{{ props.row.appearName }}</span>
                      </el-form-item>
                      <el-form-item label="收费员编号" prop="tollManID">
                        <span>{{ props.row.tollManID }}</span>
                      </el-form-item>
                      <el-form-item label="收费员名字" prop="tollName">
                        <span>{{ props.row.tollName }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态编号" prop="payStatus">
                        <span>{{ props.row.payStatus }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态" prop="payStatusName">
                        <span>{{ props.row.payStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态编号" prop="dateStatus">
                        <span>{{ props.row.dateStatus }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态" prop="dateStatusName">
                        <span>{{ props.row.dateStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="费用产生日期" prop="feeAppearDate">
                        <span>{{ props.row.feeAppearDate }}</span>
                      </el-form-item>
                      <el-form-item label="收费时间" prop="tollDate">
                        <span>{{ props.row.tollDate }}</span>
                      </el-form-item>
                      <el-form-item label="项目编号" prop="fmedItemID">
                        <span>{{ props.row.fmedItemID }}</span>
                      </el-form-item>
                      <el-form-item label="项目编码" prop="code">
                        <span>{{ props.row.code }}</span>
                      </el-form-item>
                      <el-form-item label="项目名称" prop="name">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="项目规格" prop="format">
                        <span>{{ props.row.format }}</span>
                      </el-form-item>
                      <el-form-item label="项目单价" prop="price">
                        <span>{{ props.row.price }}</span>
                      </el-form-item>
                      <el-form-item label="项目拼音助记码" prop="mnemonicCode">
                        <span>{{ props.row.mnemonicCode }}</span>
                      </el-form-item>
                      <el-form-item label="项目数量" prop="number">
                        <span>{{ props.row.number }}</span>
                      </el-form-item>
                      <el-form-item label="金额" prop="fee">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="项目检查编号" prop="chargeItemID">
                </el-table-column>
                <el-table-column label="项目名称" prop="name">
                </el-table-column>
                <el-table-column label="收费类别" prop="feeCategoryName">
                </el-table-column>
                <el-table-column label="费用科目" prop="expName">
                </el-table-column>
                <el-table-column label="规格" prop="format">
                </el-table-column>
                <el-table-column label="数量" prop="number">
                </el-table-column>
                <el-table-column label="金额" prop="fee">
                </el-table-column>
                <el-table-column label="缴费状态" prop="payStatusName">
                </el-table-column>
                <el-table-column label="日结状态" prop="dateStatusName">
                </el-table-column>
              </el-table>
            </el-col>
          </template>
          <!--处置费清单-->
          <template v-if="tollExist.disposalExist">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-divider content-position="left">处置费</el-divider>
              <el-table
                ref="multipleTable"
                :data="tollDisposalList"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="患者费用编号" prop="id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="项目处置编号" prop="chargeItemID">
                        <span>{{ props.row.chargeItemID }}</span>
                      </el-form-item>
                      <el-form-item label="病历编号" prop="medicalRecordID">
                        <span>{{ props.row.medicalRecordID }}</span>
                      </el-form-item>
                      <el-form-item label="病历号" prop="medicalRecordNo">
                        <span>{{ props.row.medicalRecordNo }}</span>
                      </el-form-item>
                      <el-form-item label="患者编号" prop="patientID">
                        <span>{{ props.row.patientID }}</span>
                      </el-form-item>
                      <el-form-item label="患者姓名" prop="patientName">
                        <span>{{ props.row.patientName }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别编号" prop="feeCategoryID">
                        <span>{{ props.row.feeCategoryID }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别" prop="feeCategoryName">
                        <span>{{ props.row.feeCategoryName }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目类型编号" prop="expID">
                        <span>{{ props.row.expID }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目" prop="expName">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生编号" prop="appearUserID">
                        <span>{{ props.row.appearUserID }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生名字" prop="appearName">
                        <span>{{ props.row.appearName }}</span>
                      </el-form-item>
                      <el-form-item label="收费员编号" prop="tollManID">
                        <span>{{ props.row.tollManID }}</span>
                      </el-form-item>
                      <el-form-item label="收费员名字" prop="tollName">
                        <span>{{ props.row.tollName }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态编号" prop="payStatus">
                        <span>{{ props.row.payStatus }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态" prop="payStatusName">
                        <span>{{ props.row.payStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态编号" prop="dateStatus">
                        <span>{{ props.row.dateStatus }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态" prop="dateStatusName">
                        <span>{{ props.row.dateStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="费用产生日期" prop="feeAppearDate">
                        <span>{{ props.row.feeAppearDate }}</span>
                      </el-form-item>
                      <el-form-item label="收费时间" prop="tollDate">
                        <span>{{ props.row.tollDate }}</span>
                      </el-form-item>
                      <el-form-item label="项目编号" prop="fmedItemID">
                        <span>{{ props.row.fmedItemID }}</span>
                      </el-form-item>
                      <el-form-item label="项目编码" prop="code">
                        <span>{{ props.row.code }}</span>
                      </el-form-item>
                      <el-form-item label="项目名称" prop="name">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="项目规格" prop="format">
                        <span>{{ props.row.format }}</span>
                      </el-form-item>
                      <el-form-item label="项目单价" prop="price">
                        <span>{{ props.row.price }}</span>
                      </el-form-item>
                      <el-form-item label="项目拼音助记码" prop="mnemonicCode">
                        <span>{{ props.row.mnemonicCode }}</span>
                      </el-form-item>
                      <el-form-item label="项目数量" prop="number">
                        <span>{{ props.row.number }}</span>
                      </el-form-item>
                      <el-form-item label="金额" prop="fee">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="患者费用编号" prop="id">
                </el-table-column>
                <el-table-column label="项目处置编号" prop="chargeItemID">
                </el-table-column>
                <el-table-column label="项目名称" prop="name">
                </el-table-column>
                <el-table-column label="收费类别" prop="feeCategoryName">
                </el-table-column>
                <el-table-column label="费用科目" prop="expName">
                </el-table-column>
                <el-table-column label="规格" prop="format">
                </el-table-column>
                <el-table-column label="单价" prop="price">
                </el-table-column>
                <el-table-column label="数量" prop="number">
                </el-table-column>
                <el-table-column label="金额" prop="fee">
                </el-table-column>
                <el-table-column label="缴费状态" prop="payStatusName">
                </el-table-column>
                <el-table-column label="日结状态" prop="dateStatusName">
                </el-table-column>
              </el-table>
            </el-col>
          </template>
          <!--处方费清单-->
          <template v-if="tollExist.presExist">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-divider content-position="left">处置费</el-divider>
              <el-table
                ref="multipleTable"
                :data="tollPresList"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="患者费用编号" prop="id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="挂号编号" prop="chargeItemID">
                        <span>{{ props.row.chargeItemID }}</span>
                      </el-form-item>
                      <el-form-item label="病历编号" prop="medicalRecordID">
                        <span>{{ props.row.medicalRecordID }}</span>
                      </el-form-item>
                      <el-form-item label="病历号" prop="medicalRecordNo">
                        <span>{{ props.row.medicalRecordNo }}</span>
                      </el-form-item>
                      <el-form-item label="患者编号" prop="patientID">
                        <span>{{ props.row.patientID }}</span>
                      </el-form-item>
                      <el-form-item label="患者姓名" prop="patientName">
                        <span>{{ props.row.patientName }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别编号" prop="feeCategoryID">
                        <span>{{ props.row.feeCategoryID }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别" prop="feeCategoryName">
                        <span>{{ props.row.feeCategoryName }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目类型编号" prop="expID">
                        <span>{{ props.row.expID }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目" prop="expName">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生编号" prop="appearUserID">
                        <span>{{ props.row.appearUserID }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生名字" prop="appearName">
                        <span>{{ props.row.appearName }}</span>
                      </el-form-item>
                      <el-form-item label="收费员编号" prop="tollManID">
                        <span>{{ props.row.tollManID }}</span>
                      </el-form-item>
                      <el-form-item label="收费员名字" prop="tollName">
                        <span>{{ props.row.tollName }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态编号" prop="payStatus">
                        <span>{{ props.row.payStatus }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态" prop="payStatusName">
                        <span>{{ props.row.payStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态编号" prop="dateStatus">
                        <span>{{ props.row.dateStatus }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态" prop="dateStatusName">
                        <span>{{ props.row.dateStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="费用产生日期" prop="feeAppearDate">
                        <span>{{ props.row.feeAppearDate }}</span>
                      </el-form-item>
                      <el-form-item label="收费时间" prop="tollDate">
                        <span>{{ props.row.tollDate }}</span>
                      </el-form-item>
                      <el-form-item label="处方编号" prop="prescriptionID">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>
                      <el-form-item label="药品编号" prop="drugID">
                        <span>{{ props.row.drugID }}</span>
                      </el-form-item>
                      <el-form-item label="药品编码" prop="drugsCode">
                        <span>{{ props.row.drugsCode }}</span>
                      </el-form-item>
                      <el-form-item label="药品名称" prop="drugsName">
                        <span>{{ props.row.drugsName}}</span>
                      </el-form-item>
                      <el-form-item label="包装单位" prop="drugsUnit">
                        <span>{{ props.row.drugsUnit}}</span>
                      </el-form-item>
                      <el-form-item label="生产厂家" prop="manufacturer">
                        <span>{{ props.row.manufacturer}}</span>
                      </el-form-item>
                      <el-form-item label="药品剂型编号" prop="drugsDosageID">
                        <span>{{ props.row.drugsDosageID}}</span>
                      </el-form-item>
                      <el-form-item label="药品剂型" prop="drugsDosageName">
                        <span>{{ props.row.drugsDosageName}}</span>
                      </el-form-item>
                      <el-form-item label="药品类型编号" prop="drugsTypeID">
                        <span>{{ props.row.drugsTypeID}}</span>
                      </el-form-item>
                      <el-form-item label="药品类型" prop="drugTypeName">
                        <span>{{ props.row.drugTypeName}}</span>
                      </el-form-item>
                      <el-form-item label="药品规格" prop="drugsFormat">
                        <span>{{ props.row.drugsFormat }}</span>
                      </el-form-item>
                      <el-form-item label="药品拼音助记码" prop="mnemonicCode">
                        <span>{{ props.row.mnemonicCode }}</span>
                      </el-form-item>
                      <el-form-item label="药品用法" prop="usage">
                        <span>{{ props.row.usage}}</span>
                      </el-form-item>
                      <el-form-item label="药品用量" prop="dosage">
                        <span>{{ props.row.dosage}}</span>
                      </el-form-item>
                      <el-form-item label="频次" prop="frequency">
                        <span>{{ props.row.frequency}}</span>
                      </el-form-item>
                      <el-form-item label="用药嘱托" prop="medication">
                        <span>{{ props.row.medication}}</span>
                      </el-form-item>
                      <el-form-item label="药品数量" prop="quantity">
                        <span>{{ props.row.quantity}}</span>
                      </el-form-item>
                      <el-form-item label="药品单价" prop="drugsPrice">
                        <span>{{ props.row.drugsPrice }}</span>
                      </el-form-item>
                      <el-form-item label="报销比例" prop="reimbursement">
                        <span>{{ props.row.reimbursement}}</span>
                      </el-form-item>
                      <el-form-item label="金额" prop="fee">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="患者费用编号" prop="id">
                </el-table-column>
                <el-table-column label="收费类别" prop="feeCategoryName">
                </el-table-column>
                <el-table-column label="费用科目" prop="expName">
                </el-table-column>
                <el-table-column label="单价" prop="price">
                </el-table-column>
                <el-table-column label="数量" prop="number">
                </el-table-column>
                <el-table-column label="金额" prop="fee">
                </el-table-column>
                <el-table-column label="缴费状态" prop="payStatusName">
                </el-table-column>
                <el-table-column label="日结状态" prop="dateStatusName">
                </el-table-column>
              </el-table>
            </el-col>
          </template>
          <!--项目药品清单-->
          <template v-if="tollExist.medExist">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-divider content-position="left">项目药品费</el-divider>
              <el-table
                ref="multipleTable"
                :data="tollMedList"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="项目药品编号" prop="id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="挂号编号" prop="chargeItemID">
                        <span>{{ props.row.chargeItemID }}</span>
                      </el-form-item>
                      <el-form-item label="病历编号" prop="medicalRecordID">
                        <span>{{ props.row.medicalRecordID }}</span>
                      </el-form-item>
                      <el-form-item label="病历号" prop="medicalRecordNo">
                        <span>{{ props.row.medicalRecordNo }}</span>
                      </el-form-item>
                      <el-form-item label="患者编号" prop="patientID">
                        <span>{{ props.row.patientID }}</span>
                      </el-form-item>
                      <el-form-item label="患者姓名" prop="patientName">
                        <span>{{ props.row.patientName }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别编号" prop="feeCategoryID">
                        <span>{{ props.row.feeCategoryID }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别" prop="feeCategoryName">
                        <span>{{ props.row.feeCategoryName }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目类型编号" prop="expID">
                        <span>{{ props.row.expID }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目" prop="name">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="项目类型编号" prop="itemsType">
                        <span>{{ props.row.itemsType }}</span>
                      </el-form-item>
                      <el-form-item label="项目类型" prop="itemsTypeName">
                        <span>{{ props.row.itemsTypeName}}</span>
                      </el-form-item>
                      <el-form-item label="创建医生编号" prop="appearUserID">
                        <span>{{ props.row.appearUserID }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生名字" prop="appearName">
                        <span>{{ props.row.appearName }}</span>
                      </el-form-item>
                      <el-form-item label="收费员编号" prop="tollManID">
                        <span>{{ props.row.tollManID }}</span>
                      </el-form-item>
                      <el-form-item label="收费员名字" prop="tollName">
                        <span>{{ props.row.tollName }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态编号" prop="payStatus">
                        <span>{{ props.row.payStatus }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态" prop="payStatusName">
                        <span>{{ props.row.payStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态编号" prop="dateStatus">
                        <span>{{ props.row.dateStatus }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态" prop="dateStatusName">
                        <span>{{ props.row.dateStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="费用产生日期" prop="feeAppearDate">
                        <span>{{ props.row.feeAppearDate }}</span>
                      </el-form-item>
                      <el-form-item label="收费时间" prop="tollDate">
                        <span>{{ props.row.tollDate }}</span>
                      </el-form-item>
                      <el-form-item label="项目药品编号" prop="medicinesMaterialsID">
                        <span>{{ props.row.drugID }}</span>
                      </el-form-item>
                      <el-form-item label="药品编码" prop="drugsCode">
                        <span>{{ props.row.drugsCode }}</span>
                      </el-form-item>
                      <el-form-item label="药品名称" prop="drugsName">
                        <span>{{ props.row.drugsName}}</span>
                      </el-form-item>
                      <el-form-item label="包装单位" prop="drugsUnit">
                        <span>{{ props.row.drugsUnit}}</span>
                      </el-form-item>
                      <el-form-item label="生产厂家" prop="manufacturer">
                        <span>{{ props.row.manufacturer}}</span>
                      </el-form-item>
                      <el-form-item label="药品剂型编号" prop="drugsDosageID">
                        <span>{{ props.row.drugsDosageID}}</span>
                      </el-form-item>
                      <el-form-item label="药品剂型" prop="drugsDosageName">
                        <span>{{ props.row.drugsDosageName}}</span>
                      </el-form-item>
                      <el-form-item label="药品类型编号" prop="drugsTypeID">
                        <span>{{ props.row.drugsTypeID}}</span>
                      </el-form-item>
                      <el-form-item label="药品类型" prop="drugsTypeName">
                        <span>{{ props.row.drugsTypeName}}</span>
                      </el-form-item>
                      <el-form-item label="药品规格" prop="drugsFormat">
                        <span>{{ props.row.drugsFormat }}</span>
                      </el-form-item>
                      <el-form-item label="药品拼音助记码" prop="mnemonicCode">
                        <span>{{ props.row.mnemonicCode }}</span>
                      </el-form-item>
                      <el-form-item label="药品数量" prop="dosage">
                        <span>{{ props.row.dosage}}</span>
                      </el-form-item>
                      <el-form-item label="药品单价" prop="drugsPrice">
                        <span>{{ props.row.drugsPrice }}</span>
                      </el-form-item>
                      <el-form-item label="报销比例" prop="reimbursement">
                        <span>{{ props.row.reimbursement}}</span>
                      </el-form-item>
                      <el-form-item label="金额" prop="fee">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="药品名称" prop="drugsName">
                </el-table-column>
                <el-table-column label="项目类型" prop=" itemsTypeName">
                </el-table-column>
                <el-table-column label="收费类别" prop="feeCategoryName">
                </el-table-column>
                <el-table-column label="费用科目" prop="name">
                </el-table-column>
                <el-table-column label="药品单价" prop="drugsPrice">
                </el-table-column>
                <el-table-column label="数量" prop="dosage">
                </el-table-column>
                <el-table-column label="药品规格" prop="drugsFormat">
                </el-table-column>
                <el-table-column label="金额" prop="fee">
                </el-table-column>
                <el-table-column label="报销比例" prop="reimbursement">
                </el-table-column>
                <el-table-column label="缴费状态" prop="payStatusName">
                </el-table-column>
                <el-table-column label="日结状态" prop="dateStatusName">
                </el-table-column>
              </el-table>
            </el-col>
          </template>
          <!--项目材料清单-->
          <template v-if="tollExist.matExist">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-divider content-position="left">项目药品费</el-divider>
              <el-table
                ref="multipleTable"
                :data="tollMatList"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="患者费用编号" prop="id">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="项目材料编号" prop="chargeItemID">
                        <span>{{ props.row.chargeItemID }}</span>
                      </el-form-item>
                      <el-form-item label="病历编号" prop="medicalRecordID">
                        <span>{{ props.row.medicalRecordID }}</span>
                      </el-form-item>
                      <el-form-item label="病历号" prop="medicalRecordNo">
                        <span>{{ props.row.medicalRecordNo }}</span>
                      </el-form-item>
                      <el-form-item label="患者编号" prop="patientID">
                        <span>{{ props.row.patientID }}</span>
                      </el-form-item>
                      <el-form-item label="患者姓名" prop="patientName">
                        <span>{{ props.row.patientName }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别编号" prop="feeCategoryID">
                        <span>{{ props.row.feeCategoryID }}</span>
                      </el-form-item>
                      <el-form-item label="收费类别" prop="feeCategoryName">
                        <span>{{ props.row.feeCategoryName }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目类型编号" prop="expID">
                        <span>{{ props.row.expID }}</span>
                      </el-form-item>
                      <el-form-item label="费用科目" prop="name">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="项目类型编号" prop="itemsType">
                        <span>{{ props.row.itemsType }}</span>
                      </el-form-item>
                      <el-form-item label="项目类型" prop="itemsTypeName">
                        <span>{{ props.row.itemsTypeName}}</span>
                      </el-form-item>
                      <el-form-item label="创建医生编号" prop="appearUserID">
                        <span>{{ props.row.appearUserID }}</span>
                      </el-form-item>
                      <el-form-item label="创建医生名字" prop="appearName">
                        <span>{{ props.row.appearName }}</span>
                      </el-form-item>
                      <el-form-item label="收费员编号" prop="tollManID">
                        <span>{{ props.row.tollManID }}</span>
                      </el-form-item>
                      <el-form-item label="收费员名字" prop="tollName">
                        <span>{{ props.row.tollName }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态编号" prop="payStatus">
                        <span>{{ props.row.payStatus }}</span>
                      </el-form-item>
                      <el-form-item label="缴费状态" prop="payStatusName">
                        <span>{{ props.row.payStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态编号" prop="dateStatus">
                        <span>{{ props.row.dateStatus }}</span>
                      </el-form-item>
                      <el-form-item label="日结状态" prop="dateStatusName">
                        <span>{{ props.row.dateStatusName }}</span>
                      </el-form-item>
                      <el-form-item label="费用产生日期" prop="feeAppearDate">
                        <span>{{ props.row.feeAppearDate }}</span>
                      </el-form-item>
                      <el-form-item label="收费时间" prop="tollDate">
                        <span>{{ props.row.tollDate }}</span>
                      </el-form-item>
                      <el-form-item label="项目材料编号" prop="medicinesMaterialsID">
                        <span>{{ props.row.drugID }}</span>
                      </el-form-item>
                      <el-form-item label="材料编码" prop="code">
                        <span>{{ props.row.drugsCode }}</span>
                      </el-form-item>
                      <el-form-item label="材料名称" prop="matName">
                        <span>{{ props.row.drugsName}}</span>
                      </el-form-item>
                      <el-form-item label="材料规格" prop="format">
                        <span>{{ props.row.drugsFormat }}</span>
                      </el-form-item>
                      <el-form-item label="材料用量" prop="dosage">
                        <span>{{ props.row.dosage}}</span>
                      </el-form-item>
                      <el-form-item label="材料单价" prop="price">
                        <span>{{ props.row.drugsPrice }}</span>
                      </el-form-item>
                      <el-form-item label="金额" prop="fee">
                        <span>{{ props.row.fee }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="材料名称" prop="matName">
                </el-table-column>
                <el-table-column label="项目类型" prop=" itemsTypeName">
                </el-table-column>
                <el-table-column label="收费类别" prop="feeCategoryName">
                </el-table-column>
                <el-table-column label="费用科目" prop="name">
                </el-table-column>
                <el-table-column label="材料规格" prop="format">
                </el-table-column>
                <el-table-column label="单价" prop="price">
                </el-table-column>
                <el-table-column label="用量" prop="dosage">
                </el-table-column>
                <el-table-column label="金额" prop="fee">
                </el-table-column>
                <el-table-column label="缴费状态" prop="payStatusName">
                </el-table-column>
                <el-table-column label="日结状态" prop="dateStatusName">
                </el-table-column>
              </el-table>
            </el-col>
          </template>


        </el-container>

      </el-row>

    </el-main>
  </el-container>

</template>


<script>
  import {TollReg, TollInspection, TollDisposal, TollPres, TollMat, TollMed} from "../../../api/feeApi";
  import Qs from 'qs';

  export default {
    name: "FeeSearch",
    data() {
      return {
        condition: {
          search: '',
          payStatus: '133',
          startDate: '',
          endDate: '',
        },
        //存放挂号收费列表
        tollRegList: [],
        tollInspectList: [],
        tollDisposalList: [],
        tollPresList: [],
        tollMatList: [],
        tollMedList: [],

        tollExist: {
          regExist: false,
          inspectExist: false,
          disposalExist: false,
          presExist: false,
          matExist: false,
          medExist: false
        },
        rules: {
          search: [
            {required: true, message: '请输入病例号', trigger: 'blur'},
            {type: 'number', message: '病历号必须为数字', trigger: 'blur'}
          ]
        }
      }

    },
    methods: {
      //获得挂号收费
      getTollReg(params) {
        TollReg(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.tollRegList = data.data;
              let arrayLength = 0;
              for (let tollReg in this.tollRegList) {
                arrayLength++;
              }
              this.tollExist.regExist = arrayLength !== 0;
            } else {
            }
          }
        });
      },
      //获得检查收费
      getTollInspection(params) {
        TollInspection(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.tollInspectList = data.data;
              let arrayLength = 0;
              for (let tollReg in this.tollInspectList) {
                arrayLength++;
              }
              this.tollExist.inspectExist = arrayLength !== 0;
            } else {
            }
          }
        });
      },
      //获得处置收费
      getTollDisposal(params) {
        TollDisposal(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.tollDisposalList = data.data;
              let arrayLength = 0;
              for (let tollReg in this.tollDisposalList) {
                arrayLength++;
              }
              this.tollExist.disposalExist = arrayLength !== 0;
            } else {
            }
          }
        });
      },
      //获得处方收费
      getTollPres(params) {
        TollPres(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.tollPresList = data.data;
              let arrayLength = 0;
              for (let tollReg in this.tollPresList) {
                arrayLength++;
              }
              this.tollExist.presExist = arrayLength !== 0;
            } else {
            }
          }
        });
      },
      //获得项目药品收费
      getTollMat(params) {
        TollMat(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.tollMatList = data.data;
              let arrayLength = 0;
              for (let tollReg in this.tollMatList) {
                arrayLength++;
              }
              this.tollExist.matExist = arrayLength !== 0;
            } else {
            }
          }
        });
      },
      //获得项目材料费
      getTollMed(params) {
        TollMed(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.tollMedList = data.data;
              let arrayLength = 0;
              for (let tollReg in this.tollMedList) {
                arrayLength++;
              }
              this.tollExist.medExist = arrayLength !== 0;
            } else {
            }
          }
        });
      },
      getToll() {
        if (this.condition.search === null || this.condition.search === '') {
          this.$message.info("请输入病例号");
        } else {
          let params = Qs.stringify(
            {
              search: this.condition.search,
              startDate: this.condition.startDate,
              endDate: this.condition.endDate,
              payStatus: this.condition.payStatus
            }
          );
          this.getTollReg(params);
          this.getTollInspection(params);
          this.getTollDisposal(params);
          this.getTollPres(params);
          this.getTollMed(params);
          this.getTollMat(params)
        }
      }
      , handleSearchChange() {
        this.getToll();
      },
      handlePayStatusChange() {
        this.getToll();
      },
      handleStartDateChange() {
        this.getToll();
      },
      handleEndDateChange() {
        this.getToll();
      },
    },
    mounted() {

    }


  }
</script>


<style>
  .el-col-display {
    float: left;
    margin-left: 46px;
    margin-top: 6px;
    height: 40px
  }

  .el-row {
    margin-bottom: 10px;
  }

  .show-shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .row-bg {
    padding: 10px 0;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 200px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
